---
spec_id: STD-001
title: Testing
spec_type: standard
status: approved
owner: luis
last_updated: 2026-11-27
tags: [tests, vitest, playwright, fast-check]
replacement: null
---

# Testing

## Rules

1. Write the failing test first. Then write the code that makes it pass.
2. Structure every test as Arrange, Act, Assert, with a blank line between the three parts.
3. Use Vitest for unit, integration, property and contract tests.
4. Use fast-check (`@fast-check/vitest`) for property tests on validators, services and pure functions.
5. Use Playwright for end-to-end and visual regression tests in `citei-webapp`.
6. Run visual tests only in the pinned Playwright Docker image (`npm run test:visual`). Update snapshots only when the change is on purpose.
7. Never weaken or delete a test to make it pass. Fix the code, or explain why the test is wrong.
8. Run the suites below before you say a change is done.

## Where tests live

| Repo | Kind | Folder | Command |
|---|---|---|---|
| backend | unit | `src/tests/unit/` | `npm test` |
| backend | integration | `src/tests/integration/` | `npm test` |
| backend | property | `src/tests/property/` | `npm run test:property` |
| backend | contract (provider) | `src/tests/pact/` | `npm run test:pact` |
| backend | load | `load-test/` | `npm run load:test` |
| webapp | unit | `__tests__/unit/` | `npm run test:unit` |
| webapp | component | `__tests__/components/` | `npm test` |
| webapp | integration | `__tests__/integration/` | `npm run test:integration` |
| webapp | property | `__tests__/property/` | `npm run test:property` |
| webapp | contract (consumer) | `__tests__/pact/` | `npm run test:pact` |
| webapp | end-to-end | `__tests__/e2e/` | `npm run test:e2e` |
| webapp | visual | `visual/` | `npm run test:visual` |

Shared test data: backend `src/tests/config/` (fakes, fixtures, mocks), webapp `__tests__/factory/`.

## Enforcement

| Rule | Executor |
|---|---|
| Code compiles | Husky `pre-push`: `typecheck` and `build` |
| 1 to 8 | Recommendation. The hooks do not run tests. |

API contract changes follow [STD-002].
