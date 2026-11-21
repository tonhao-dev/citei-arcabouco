---
inclusion: fileMatch
fileMatchPattern:
  - "citei-backend/**"
---

# citei-backend

You are editing the API (Express, TypeORM, PostgreSQL). Before you change code, open these specs through `citei-arcabouco/INDEX.md`:

- [ARCH-001] for the layers: routes, controllers, services, repositories, entities.
- [STD-001] for tests. Backend tests live in `src/tests/`.
- [STD-002] when a route, request or response changes. The backend is the Pact provider.
- [ADR-001] for the local Pact Broker.
