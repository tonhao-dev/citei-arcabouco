---
inclusion: always
---

# Citei

Workspace root: the parent folder `citei/`. It holds three repos:
`citei-arcabouco` (rules and docs), `citei-backend` (API) and `citei-webapp` (browser app).

## Read first

1. `citei-arcabouco/INDEX.md` maps each spec ID to its file.
2. `citei-arcabouco/GLOSSARY.md` holds the domain terms. Use them.
3. [AI-001] is how you work here. [ARCH-001] is the system overview.

## Core rules

- Only `approved` specs are rules. A `draft` spec is a proposal: say so when you follow it.
- Put every rule, decision or doc Markdown in `citei-arcabouco`. Code repos keep only `README.md`.
- Text for agents is English. Text for humans (README, ADR, C4) is Brazilian Portuguese.
- Secrets follow [SEC-001]. Tests follow [STD-001]. API changes follow [STD-002]. Commits follow [STD-003].
- Everything runs locally. There is no CI. Never push to `master` or `main`.
