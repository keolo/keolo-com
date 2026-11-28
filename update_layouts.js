import fs from 'fs';

function updateFile(file) {
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('data-highlight-root')) {
    // Add import
    if (!content.includes('import TextHighlighter')) {
      const relativePath = file.includes('pages')
        ? '../components/TextHighlighter.astro'
        : '../components/TextHighlighter.astro';
      content = content.replace(/---\n/, `---\nimport TextHighlighter from '${relativePath}';\n`);
    }

    // Add component and attribute
    content = content.replace(
      /<div\s+class="prose/,
      '<TextHighlighter />\n    <div data-highlight-root class="prose'
    );

    fs.writeFileSync(file, content);
  }
}

updateFile('src/layouts/PostLayout.astro');
updateFile('src/layouts/ProjectLayout.astro');
updateFile('src/pages/about.astro');
