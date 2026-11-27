export interface HighlightColor {
  id: string;
  label: string;
  background: string;
  swatch: string;
}

export const DEFAULT_HIGHLIGHT_COLORS: HighlightColor[] = [
  {
    id: 'keolo-hl-amber',
    label: 'Amber',
    background: 'var(--color-amber-200)',
    swatch: 'var(--color-amber-400)',
  },
  {
    id: 'keolo-hl-mint',
    label: 'Mint',
    background: 'var(--color-mint-200)',
    swatch: 'var(--color-mint-400)',
  },
  {
    id: 'keolo-hl-sky',
    label: 'Sky',
    background: 'var(--color-sky-200)',
    swatch: 'var(--color-sky-400)',
  },
  {
    id: 'keolo-hl-rose',
    label: 'Rose',
    background: 'var(--color-rose-200)',
    swatch: 'var(--color-rose-400)',
  },
  {
    id: 'keolo-hl-violet',
    label: 'Violet',
    background: 'var(--color-violet-200)',
    swatch: 'var(--color-violet-400)',
  },
];

export function isCustomHighlightSupported(): boolean {
  return (
    typeof window !== 'undefined' && 'CSS' in window && 'highlights' in CSS && 'Highlight' in window
  );
}

export function getValidSelectionRange(): Range | null {
  if (typeof window === 'undefined') return null;

  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
    return null;
  }

  const range = selection.getRangeAt(0);
  const text = range.toString();

  // Reject whitespace-only or empty
  if (text.trim().length === 0) {
    return null;
  }

  // Reject out-of-root or cross-root
  const commonAncestor = range.commonAncestorContainer;
  const element =
    commonAncestor.nodeType === Node.ELEMENT_NODE
      ? (commonAncestor as Element)
      : commonAncestor.parentElement;

  if (!element) return null;

  const root = element.closest('[data-highlight-root]');
  if (!root) {
    return null;
  }

  // Reject editable-input selections
  const activeEl = document.activeElement;
  if (
    activeEl &&
    (activeEl.tagName === 'INPUT' ||
      activeEl.tagName === 'TEXTAREA' ||
      (activeEl as HTMLElement).isContentEditable)
  ) {
    return null;
  }

  return range;
}

export class TextHighlightController {
  private colors: HighlightColor[];
  private currentIndex: number = 0;
  private lastSelectionText: string = '';
  private isInitialized: boolean = false;

  constructor(colors: HighlightColor[] = DEFAULT_HIGHLIGHT_COLORS) {
    this.colors = colors;
  }

  private initHighlights(): void {
    if (this.isInitialized || !isCustomHighlightSupported()) return;

    this.colors.forEach((color) => {
      if (!CSS.highlights.has(color.id)) {
        const highlight = new Highlight();
        CSS.highlights.set(color.id, highlight);
      }
    });
    this.isInitialized = true;
  }

  advanceColorOnNewSelection(range: Range | null): void {
    if (!range) return;
    const text = range.toString().trim();

    // Ignore empty selections or duplicate selections
    if (!text || text === this.lastSelectionText) return;

    if (this.lastSelectionText !== '') {
      this.currentIndex = (this.currentIndex + 1) % this.colors.length;
    }

    this.lastSelectionText = text;
  }

  getActiveColor(): HighlightColor {
    return this.colors[this.currentIndex];
  }

  applyHighlight(range: Range): void {
    if (!isCustomHighlightSupported() || !range) return;
    this.initHighlights();

    const clonedRange = range.cloneRange();
    const activeColor = this.getActiveColor();

    const highlight = CSS.highlights.get(activeColor.id);
    if (highlight) {
      highlight.add(clonedRange);
    }
  }

  clearHighlights(): void {
    if (!isCustomHighlightSupported()) return;
    this.initHighlights();

    this.colors.forEach((color) => {
      const highlight = CSS.highlights.get(color.id);
      if (highlight) {
        highlight.clear();
      }
    });

    this.currentIndex = 0;
    this.lastSelectionText = '';
  }
}
