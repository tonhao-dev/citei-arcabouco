---
spec_id: AI-001
title: Agent conduct
spec_type: ai-guideline
status: draft
owner: luis
last_updated: 2026-11-21
tags: [ai, agents]
replacement: null
---

# Agent conduct

## Authority

1. Only specs with `status: approved` are rules. Treat `draft` as a proposal and say so when you follow one.
2. Resolve a spec ID through [INDEX.md](../../INDEX.md). Cite specs by ID in brackets, never by path.
3. On conflict, follow this order: security > architecture > standards > AI guidelines. Ask Luis when the conflict stays.
4. Use the domain terms of [GLOSSARY.md](../../GLOSSARY.md). Ask when a term is not there.

## Where things go

1. All rule, decision and documentation Markdown goes in `citei-arcabouco`. Code repos keep only `README.md`. See [ADR-002].
2. Language follows the reader: text for agents is English, text for humans is Brazilian Portuguese.
3. A new decision that is hard to reverse becomes an ADR in `specs/adr/`, in Portuguese.

## Changing this repo

1. Never reuse a spec ID, even after deprecation.
2. A new spec starts as `draft`. Only Luis sets `approved`.
3. Run `npm run index` and `npm run validate` before every commit.

## Working

1. Read before you change. Check the code before you claim how it works.
2. Do only what was asked. Offer extra work instead of doing it.
3. Run the relevant tests from [STD-001] and show the result before you say work is done.
4. Never push to `master` or `main`. Follow [STD-003].
5. Follow [SEC-001] for any secret.

## Enforcement

| Rule | Executor |
|---|---|
| Changing this repo, 1 (duplicates only) and 3 | `npm run validate` in the Husky `pre-commit` of this repo |
| Everything else | Recommendation |
