#!/bin/sh

# 1. Prevent direct commits on main branch
if git rev-parse --verify HEAD >/dev/null 2>&1; then
    branch="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || git symbolic-ref --short HEAD 2>/dev/null)"
    if [ "$branch" = "main" ]; then
        echo "Error: Direct commits on main are prohibited. Please use a feature branch." >&2
        exit 1
    fi
fi

staged_files="$(git diff --cached --name-only 2>/dev/null)"

# 2. Manifest Integrity Enforcement (YAML syntax & required fields)
validate_manifest_content() {
    file_label="$1"

    if command -v alv >/dev/null 2>&1; then
        alv workspace validate - || return 1
        return 0
    elif command -v av >/dev/null 2>&1 && av workspace --help >/dev/null 2>&1; then
        av workspace validate - || return 1
        return 0
    fi

    echo "Warning: 'alv' CLI not found in PATH; skipping manifest validation for ${file_label}." >&2
    return 0
}

if [ -n "$staged_files" ]; then
    if echo "$staged_files" | grep -qx "alv\.yaml" && git cat-file -e ":alv.yaml" 2>/dev/null; then
        git show ":alv.yaml" 2>/dev/null | validate_manifest_content "alv.yaml" || exit 1
    fi

    if echo "$staged_files" | grep -qx "av\.yaml" && git cat-file -e ":av.yaml" 2>/dev/null; then
        echo "Warning: legacy av.yaml detected. Migrate to alv.yaml" >&2
        git show ":av.yaml" 2>/dev/null | validate_manifest_content "av.yaml" || exit 1
    fi
fi

exit 0
