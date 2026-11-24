import { describe, expect, it } from 'vitest';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { VFile } from 'vfile';
import remarkMermaidV13 from '../mermaid-v13';

async function renderMarkdown(markdown: string, filePath = 'test.md'): Promise<string> {
  const file = new VFile({ path: filePath, value: markdown });
  const processor = unified()
    .use(remarkParse)
    .use(remarkMermaidV13)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true });

  const result = await processor.process(file);
  return String(result);
}

describe('remarkMermaidV13', () => {
  it('renders a flowchart diagram to inline <svg> without client-side scripts', async () => {
    const md = `# Architecture

\`\`\`mermaid
flowchart TD
    A[Intent] --> B[Spec]
    B --> C[Build]
\`\`\`
`;
    const html = await renderMarkdown(md, 'architecture.md');
    expect(html).toContain('<figure class="mermaid-diagram"');
    expect(html).toContain('<svg');
    expect(html).toContain('</svg>');
    expect(html).not.toContain('<script');
  });

  it('renders a timeline diagram to inline <svg> without a browser DOM', async () => {
    const md = `\`\`\`mermaid
timeline
    title Evolution
    2024 : Prompting
    2025 : Spec-Driven Development
\`\`\`
`;
    const html = await renderMarkdown(md, 'timeline.md');
    expect(html).toContain('<svg');
    expect(html).toContain('</svg>');
    expect(html).not.toContain('<script');
  });

  it('throws a descriptive error including the source file path on invalid syntax', async () => {
    const md = `\`\`\`mermaid
this is not valid mermaid syntax at all
\`\`\`
`;
    await expect(renderMarkdown(md, 'src/content/posts/broken.md')).rejects.toThrow(
      /Failed to render Mermaid diagram in src\/content\/posts\/broken\.md/
    );
  });

  it('throws a descriptive error on unsupported diagram types such as zenuml', async () => {
    const md = `\`\`\`mermaid
zenuml
    title Unsupported
    Alice->Bob: Hello
\`\`\`
`;
    await expect(renderMarkdown(md, 'src/content/posts/unsupported.md')).rejects.toThrow(
      /Failed to render Mermaid diagram in src\/content\/posts\/unsupported\.md/
    );
  });
});
