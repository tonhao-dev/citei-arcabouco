---
spec_id: STD-002
title: API changes go through Pact
spec_type: standard
status: draft
owner: luis
last_updated: 2026-11-21
tags: [api, pact, contracts]
replacement: null
---

# API changes go through Pact

The Pact contract is the API contract. There is no OpenAPI file written ahead of the code.
`citei-webapp` is the consumer. `citei-backend` is the provider. The broker is local, see [ADR-001].

## Rules

1. Any change to a route, request or response shape changes the consumer test first, in `citei-webapp/__tests__/pact/`.
2. Never remove or rename a response field the consumer still reads. Add the new field, move the consumer, then remove the old field, in that order.
3. Add a provider state in the backend for every new consumer interaction.
4. Run the full loop before you say an API change is done:

```bash
# citei-backend
npm run pact:broker:up
# citei-webapp
npm run test:pact
npm run pact:publish
# citei-backend
npm run pact:verify
npm run pact:can-i-deploy
# citei-webapp
npm run pact:can-i-deploy
```

5. `can-i-deploy` must say yes for both sides.

## Enforcement

| Rule | Executor |
|---|---|
| 1 to 5 | Recommendation. No hook runs Pact. |
