---
spec_id: ARCH-003
title: C4 nível 2, containers
spec_type: architecture
status: draft
owner: luis
last_updated: 2026-11-27
tags: [architecture, c4]
replacement: null
---

# Citei: Container (C4, nível 2)

![Diagrama de containers do Citei](img/ARCH-003-container.png)

## Legenda

| Container | Tecnologia | Porta |
|---|---|---|
| citei-webapp | React 19, Vite 7, nginx | 80 no container |
| citei-backend | Express 4, TypeORM 0.3 | 3000 no container, 3123 no host |
| PostgreSQL | postgres:16-alpine | 5432 |

Os três containers compartilham a rede Docker `citei-net`.
