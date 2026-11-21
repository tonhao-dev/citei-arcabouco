---
spec_id: SEC-001
title: Secrets stay out of git
spec_type: security
status: draft
owner: luis
last_updated: 2026-11-21
tags: [security, secrets, snyk]
replacement: null
---

# Secrets stay out of git

## Rules

1. Put every secret in the repo's `.env` file. Examples: database password, `SNYK_TOKEN`, `PACT_BROKER_TOKEN`.
2. Keep `.env` in `.gitignore`. Both code repos already ignore it.
3. List every variable in `.env.example` with a placeholder value, never a real one.
4. Never write a secret in code, tests, fixtures, Markdown, commit messages or logs.
5. Never print a secret to the terminal or the chat. Check that a variable is set, not what it holds.
6. A new dependency, Dockerfile change or image change runs `npm run snyk:all` before push, when `SNYK_TOKEN` is set.

## Enforcement

| Rule | Executor |
|---|---|
| 2 | `.gitignore` in each repo |
| 6 | Snyk scripts fail on high severity or above. Run by hand. |
| 1, 3, 4, 5 | Recommendation. No automatic check yet. |

## If a secret leaks

1. Rotate the secret first.
2. Then remove it from the repo history.
