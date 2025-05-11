# Hugo Docker development Makefile

# Variables
DOCKER_IMAGE := registry.gitlab.com/pages/hugo/hugo_extended:0.140.2
DOCKER_PLATFORM := linux/amd64
HUGO_PORT := 1313

# Set default goal
.DEFAULT_GOAL := help

# Default target
.PHONY: help
help:
	@echo "Available targets:"
	@echo "  serve      - Run Hugo server locally with Docker (with draft posts)"
	@echo "  build      - Build the static site using Docker"
	@echo "  clean      - Remove the generated site"

# Run Hugo server locally with Docker (with draft content)
.PHONY: serve
serve:
	docker run --rm \
		--platform $(DOCKER_PLATFORM) \
		-v $(PWD):/src \
		-p $(HUGO_PORT):$(HUGO_PORT) \
		$(DOCKER_IMAGE) \
		hugo server -D --bind 0.0.0.0

# Build the static site
.PHONY: build
build:
	docker run --rm \
		--platform $(DOCKER_PLATFORM) \
		-v $(PWD):/src \
		$(DOCKER_IMAGE) \
		hugo

# Clean the generated site
.PHONY: clean
clean:
	rm -rf public/
