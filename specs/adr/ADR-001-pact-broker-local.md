---
spec_id: ADR-001
title: O Pact Broker roda só localmente, no compose do backend
spec_type: adr
status: approved
owner: luis
last_updated: 2026-11-27
tags: [pact, contracts, local]
replacement: null
---

# O Pact Broker roda só localmente, no compose do backend

Origem: `citei-backend/docs/adr/0001-pact-broker-local.md`, movido para cá.

## Contexto

Os contratos entre o frontend e o backend precisam de um Pact Broker. Os dois repositórios são separados e hoje não têm CI.

## Decisão

O broker sobe por `docker-compose.pact.yml` no repositório do backend, com Postgres próprio, em http://localhost:9292. Não há workflow de GitHub Actions por enquanto.

## Consequências

- Funciona na oficina e na máquina de cada pessoa, sem custo e sem segredos.
- O CI do GitHub não alcança o `localhost`. Para usar contratos no CI será preciso um broker em endereço público e os segredos `PACT_BROKER_BASE_URL` e `PACT_BROKER_TOKEN`.
- Os scripts já leem `PACT_BROKER_BASE_URL`, então trocar o endereço do broker não exige mudar código.
