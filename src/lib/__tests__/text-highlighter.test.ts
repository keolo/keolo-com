/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it, beforeEach, vi } from 'vitest';
import {
  TextHighlightController,
  getValidSelectionRange,
  isCustomHighlightSupported,
  DEFAULT_HIGHLIGHT_COLORS,
} from '../text-highlighter';

describe('text-highlighter', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    (globalThis as any).CSS = {
      highlights: {
        get: vi.fn(),
        set: vi.fn(),
        has: vi.fn().mockReturnValue(false),
        clear: vi.fn(),
      },
    };
    (globalThis as any).window = {
      Highlight: vi.fn(),
      CSS: (globalThis as any).CSS,
      getSelection: vi.fn(),
    };
    (globalThis as any).Highlight = vi.fn();
    (globalThis as any).Node = { ELEMENT_NODE: 1 };
    (globalThis as any).document = {
      activeElement: null,
    };
  });

  describe('isCustomHighlightSupported', () => {
    it('returns true when CSS.highlights is supported', () => {
      expect(isCustomHighlightSupported()).toBe(true);
    });

    it('returns false when CSS.highlights is missing', () => {
      delete (globalThis as any).CSS.highlights;
      expect(isCustomHighlightSupported()).toBe(false);
    });

    it('returns false when window is undefined', () => {
      delete (globalThis as any).window;
      expect(isCustomHighlightSupported()).toBe(false);
    });
  });

  describe('Color Cycling & Palette Configuration', () => {
    it('starts with index 0 of default palette', () => {
      const controller = new TextHighlightController();
      expect(controller.getActiveColor()).toEqual(DEFAULT_HIGHLIGHT_COLORS[0]);
    });

    it('cycles color on distinct valid selections', () => {
      const controller = new TextHighlightController();

      const createMockRange = (text: string): Range => {
        return {
          toString: () => text,
        } as any;
      };

      // First selection (initializes signature, color stays at 0)
      controller.advanceColorOnNewSelection(createMockRange('first'));
      expect(controller.getActiveColor()).toEqual(DEFAULT_HIGHLIGHT_COLORS[0]);

      // Second distinct selection
      controller.advanceColorOnNewSelection(createMockRange('second'));
      expect(controller.getActiveColor()).toEqual(DEFAULT_HIGHLIGHT_COLORS[1]);

      // Third distinct selection
      controller.advanceColorOnNewSelection(createMockRange('third'));
      expect(controller.getActiveColor()).toEqual(DEFAULT_HIGHLIGHT_COLORS[2]);
    });

    it('ignores duplicate selections', () => {
      const controller = new TextHighlightController();
      const range = { toString: () => 'same' } as any;

      controller.advanceColorOnNewSelection(range);
      expect(controller.getActiveColor()).toEqual(DEFAULT_HIGHLIGHT_COLORS[0]);

      controller.advanceColorOnNewSelection(range);
      expect(controller.getActiveColor()).toEqual(DEFAULT_HIGHLIGHT_COLORS[0]);
    });
  });

  describe('getValidSelectionRange', () => {
    const setSelection = (sel: any) => {
      (globalThis as any).window.getSelection = () => sel;
    };

    it('rejects empty or whitespace-only selections', () => {
      setSelection(null);
      expect(getValidSelectionRange()).toBeNull();

      setSelection({ isCollapsed: true, rangeCount: 1 });
      expect(getValidSelectionRange()).toBeNull();

      setSelection({
        isCollapsed: false,
        rangeCount: 1,
        getRangeAt: () => ({ toString: () => '   ' }),
      });
      expect(getValidSelectionRange()).toBeNull();
    });

    it('rejects out-of-root selections', () => {
      setSelection({
        isCollapsed: false,
        rangeCount: 1,
        getRangeAt: () => ({
          toString: () => 'text',
          commonAncestorContainer: {
            nodeType: 1,
            closest: () => null,
          },
        }),
      });
      expect(getValidSelectionRange()).toBeNull();
    });
  });

  describe('CSS.highlights registration and clearing', () => {
    it('applies highlight using CSS API without DOM mutation', () => {
      const controller = new TextHighlightController();
      const mockRange = { cloneRange: () => mockRange } as any;
      const mockHighlight = { add: vi.fn() };

      (globalThis as any).Highlight = vi.fn().mockImplementation(function () {
        return mockHighlight;
      });
      (globalThis as any).window.Highlight = (globalThis as any).Highlight;
      (globalThis as any).CSS.highlights.has.mockReturnValue(false);
      (globalThis as any).CSS.highlights.get.mockReturnValue(mockHighlight);

      controller.applyHighlight(mockRange);

      expect((globalThis as any).CSS.highlights.set).toHaveBeenCalledWith(
        'keolo-hl-amber',
        expect.anything()
      );
      expect(mockHighlight.add).toHaveBeenCalledWith(mockRange);
    });

    it('clears highlights correctly', () => {
      const controller = new TextHighlightController();
      const mockHighlight = { clear: vi.fn() };

      (globalThis as any).CSS.highlights.has.mockReturnValue(true);
      (globalThis as any).CSS.highlights.get.mockReturnValue(mockHighlight);

      controller.clearHighlights();

      expect(mockHighlight.clear).toHaveBeenCalled();
      expect(controller.getActiveColor()).toEqual(DEFAULT_HIGHLIGHT_COLORS[0]);
    });
  });
});
