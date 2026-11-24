import crypto from 'node:crypto';
import type { Code, Html, Parent, Root } from 'mdast';
import mermaid from 'mermaid';
import { visit } from 'unist-util-visit';
import type { VFile } from 'vfile';

const svgCache = new Map<string, string>();

interface MermaidTarget {
  node: Code;
  index: number;
  parent: Parent;
}

export function clearMermaidCache(): void {
  svgCache.clear();
}

export async function renderMermaidSvg(code: string, filePath = 'unknown file'): Promise<string> {
  const hash = crypto.createHash('sha256').update(code).digest('hex');
  const cached = svgCache.get(hash);
  if (cached) {
    return cached;
  }

  try {
    const id = `mermaid-${hash.slice(0, 12)}`;
    const result = await mermaid.render(id, code);
    const svg = result?.svg;
    if (!svg || !svg.includes('<svg')) {
      throw new Error('Mermaid returned empty or invalid SVG markup.');
    }
    svgCache.set(hash, svg);
    return svg;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to render Mermaid diagram in ${filePath}: ${message}`);
  }
}

export default function remarkMermaidV13() {
  return async (tree: Root, file: VFile): Promise<void> => {
    const targets: MermaidTarget[] = [];

    visit(tree, 'code', (node: Code, index: number | undefined, parent: Parent | undefined) => {
      if (node.lang === 'mermaid' && typeof index === 'number' && parent) {
        targets.push({ node, index, parent });
      }
    });

    if (targets.length === 0) {
      return;
    }

    const filePath = file.path || 'unknown file';

    for (const { node, index, parent } of targets) {
      const svg = await renderMermaidSvg(node.value, filePath);
      const htmlNode: Html = {
        type: 'html',
        value: `<figure class="mermaid-diagram" role="img" aria-label="Mermaid diagram">${svg}</figure>`,
      };
      parent.children[index] = htmlNode;
    }
  };
}
