# Hugo Docker development Makefile

# Variables
DOCKER_IMAGE := hugomods/hugo:exts
HUGO_PORT := 1313

# Set default goal
.DEFAULT_GOAL := help

# Default target
.PHONY: help
help:
	@echo "Available targets:"
	@echo "  run        - Run Hugo server locally with Docker (with draft posts)"
	@echo "  build      - Build the static site using Docker"
	@echo "  clean      - Remove the generated site"
	@echo "  new-post   - Create a new post (usage: make new-post NAME=my-post-name)"

# Run Hugo server locally with Docker (with draft content)
.PHONY: run
run:
	docker run --rm \
		-v $(PWD):/src \
		-p $(HUGO_PORT):$(HUGO_PORT) \
		$(DOCKER_IMAGE) \
		hugo server -D --bind 0.0.0.0

# Build the static site
.PHONY: build
build:
	docker run --rm \
		-v $(PWD):/src \
		$(DOCKER_IMAGE) \
		hugo

# Clean the generated site
.PHONY: clean
clean:
	rm -rf public/

# Create a new post
.PHONY: new-post
new-post:
	@if [ -z "$(NAME)" ]; then \
		echo "Error: Please provide a post name using NAME=your-post-name"; \
		echo "Example: make new-post NAME=my-awesome-post"; \
		exit 1; \
	fi
	docker run --rm \
		-v $(PWD):/src \
		$(DOCKER_IMAGE) \
		hugo new posts/$(NAME).md
	@echo "Created new post: content/posts/$(NAME).md"
