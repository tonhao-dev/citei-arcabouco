---
spec_id: STD-003
title: Commits and branches
spec_type: standard
status: draft
owner: luis
last_updated: 2026-11-21
tags: [git, commits]
replacement: null
---

# Commits and branches

## Rules

1. Write commit subjects in Conventional Commits form: `type(scope): summary`.
2. Allowed types: `feat`, `fix`, `test`, `style`, `refactor`, `docs`, `chore`, `perf`, `build`, `revert`.
3. Keep the subject in English, lower case, imperative, at most 72 characters, no final period.
4. One commit holds one change. Stage only the files of that change.
5. Never commit to `master` or `main` directly. Work on a branch named `<type>/<short-topic>`, then open a pull request.
6. Never use `--no-verify` to skip a Husky hook. Fix what the hook reports.

## Enforcement

| Rule | Executor |
|---|---|
| 1 to 6 | Recommendation. No commit-msg hook yet. |
