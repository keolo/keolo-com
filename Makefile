# Keolo.com Astro development & maintenance Makefile

.DEFAULT_GOAL := help

.PHONY: help install run test lint maintain build clean

help:
	@echo "Available targets:"
	@echo "  run        - Start Astro dev server (invoked by 'alv run')"
	@echo "  maintain   - Run typecheck, lint, format check, tests, audit, and build (invoked by 'alv maintain')"
	@echo "  test       - Run unit and integration tests"
	@echo "  lint       - Run ESLint and astro check"
	@echo "  build      - Build production static site to dist/"
	@echo "  clean      - Remove generated build artifacts"

install:
	@if [ ! -d "node_modules" ] || [ ! -f "node_modules/.bin/astro" ]; then \
		pnpm install --frozen-lockfile || pnpm install; \
	fi
	@node scripts/ensure-node.mjs

run: install
	pnpm run dev

test: install
	pnpm run test

lint: install
	pnpm run check
	pnpm run lint
	pnpm run format:check

maintain: install
	pnpm run check
	pnpm run lint
	pnpm run format:check
	pnpm run test
	pnpm audit --audit-level=high || true
	pnpm run build

build: install
	pnpm run build

clean:
	rm -rf dist/ .astro/
