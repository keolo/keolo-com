# Keolo.com

## Setup

- Install Docker: [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- Hugo is run via Docker (version 0.140.2) - no local installation needed

## Workflow

1. Build site and run development server: `make run`
2. Create a new post: `make new-post NAME=my-post-name`
3. Preview site: http://localhost:1313/
4. Approve post: `draft: false`
5. Build static site: `make build`
6. Deploy site: `git commit -am "message" && git push`
7. Site is automatically built and deployed to [GitLab Pages](https://gitlab.com/keolo-personal/keolo.gitlab.io/-/pipelines)

## Available Commands

- `make run` - Run Hugo development server (includes draft posts)
- `make build` - Build the static site to `public/` directory
- `make clean` - Remove generated files
- `make new-post NAME=<name>` - Create a new post with the given name

## Usage

- Edit configuration: `hugo.yaml`
- Edit theme: `cp themes/PaperMod/layouts/partials/header.html layouts/partials/header.html`

## Project Pages

Project pages are standardized under the following structure: Challenge → Approach → Outcomes → Stack → CTA; keep under 350 words (excluding carousel and diagrams).

## Appendix

- [Using Hugo's Syntax Highlighter Chroma](https://adityatelange.github.io/hugo-PaperMod/posts/papermod/papermod-faq/#using-hugos-syntax-highlighter-chroma)
- [Hide a Page in Hugo](https://makewithhugo.com/hide-a-page/)
- [Photo Swipe](https://photoswipe.com/getting-started/)
- [Code Highlighting](https://swapoff.org/chroma/playground/)
- [Favicons](https://medium.com/web-dev-survey-from-kyoto/favicon-nightmare-how-to-maintain-sanity-7628bfc39918)
