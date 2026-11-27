---
spec_id: ARCH-001
title: System overview
spec_type: architecture
status: draft
owner: luis
last_updated: 2026-11-21
tags: [architecture, stack]
replacement: null
---

# System overview

Citei stores quotes by an author, grouped in collections, and shows them in the browser.
The container diagram is [ARCH-003]. Domain terms are in [GLOSSARY.md](../../GLOSSARY.md).

## Workspace layout

The workspace root is the parent folder `citei/`. It is not a git repository. See [ADR-002].

| Folder | Git remote | Role |
|---|---|---|
| `citei-arcabouco/` | `tonhao-dev/citei-arcabouco` | Rules, decisions and docs. The only home for Markdown besides each repo's `README.md`. |
| `citei-backend/` | `tonhao-dev/citei-backend` | HTTP API. Pact provider. |
| `citei-webapp/` | `tonhao-dev/citei-webapp` | Browser app. Pact consumer. |

## Backend (`citei-backend`)

- Runtime: Node.js, TypeScript, Express.
- Persistence: PostgreSQL through TypeORM. Schema changes go through TypeORM migrations in `src/database/migrations/`.
- Layers in `src/app/`: `routes` -> `controllers` -> `services` -> `repositories` -> `entities`. Contracts for each layer live in `src/app/interfaces/`.
- Input validation: `express-validator`, in `src/app/validators/`.
- Errors: throw `AppError`. `ErrorHandle` turns it into the HTTP response.
- Code names use the Portuguese domain terms (`Colecao`, `Citacao`) with English suffixes (`ColecaoService`).

## Webapp (`citei-webapp`)

- Runtime: React, TypeScript, Vite, React Router, axios.
- Folders in `src/`: `components`, `containers`, `pages`, `entities`, `interfaces`, `repository`, `service`, `styles`.
- Code names use English terms (`collection`, `quotation`). The glossary maps them to the domain terms.

## Local only

- Each repo runs with `docker compose` and has a Husky `pre-push` hook (`typecheck` and `build`).
- There is no CI. Tests and checks run on the developer machine.
- The Pact Broker runs locally. See [ADR-001].
