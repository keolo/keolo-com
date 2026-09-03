# Keolo.com

Personal website built with [Hugo](https://gohugo.io/) and the [PaperMod](https://github.com/adityatelange/hugo-PaperMod) theme.

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Hugo runs via Docker; no local installation needed)

## Commands

```bash
# Start local dev server with drafts enabled (http://localhost:1313)
make run

# Create a new post in content/posts/<name>.md
make new-post NAME=my-post-name

# Build static site to public/
make build

# Remove generated build files
make clean
```

## Content & Development

- **Publishing**: Set `draft: false` in the post front matter. Pushing to `main` automatically builds and deploys the site to GitHub Pages via GitHub Actions.
- **Configuration**: Edit site configuration in `hugo.yaml`.
- **Theme Overrides**: Copy templates from `themes/PaperMod/layouts/` into `layouts/` to override them (e.g., `cp themes/PaperMod/layouts/partials/header.html layouts/partials/header.html`).
- **Project Pages**: Follow the structure: **Challenge → Approach → Outcomes → Stack → CTA** (under 350 words, excluding carousels and diagrams).

## References

- [PaperMod Chroma Syntax Highlighting](https://adityatelange.github.io/hugo-PaperMod/posts/papermod/papermod-faq/#using-hugos-syntax-highlighter-chroma)
- [Chroma Style Gallery](https://swapoff.org/chroma/playground/)
- [PhotoSwipe Documentation](https://photoswipe.com/getting-started/)
- [Hiding a Page in Hugo](https://makewithhugo.com/hide-a-page/)
- [Favicon Guidelines](https://medium.com/web-dev-survey-from-kyoto/favicon-nightmare-how-to-maintain-sanity-7628bfc39918)
