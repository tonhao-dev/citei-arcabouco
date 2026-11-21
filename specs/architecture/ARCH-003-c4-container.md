---
spec_id: ARCH-003
title: C4 nível 2, containers
spec_type: architecture
status: draft
owner: luis
last_updated: 2026-11-21
tags: [architecture, c4]
replacement: null
---

# Citei: Container (C4, nível 2)

```mermaid
C4Container
title Container View: Citei

Person(usuario, "Usuário", "Guarda e lê citações de autores, em coleções.")

System_Boundary(citei, "Citei") {
  Container(webapp, "citei-webapp", "React 19, Vite, nginx", "Mostra coleções e citações no navegador. Os arquivos estáticos saem do nginx.")
  Container(api, "citei-backend", "Node.js, Express, TypeORM", "API REST de coleções e citações. Valida os dados e expõe /health.")
  ContainerDb(db, "PostgreSQL", "PostgreSQL 16", "Guarda coleções e citações.")
}

System_Ext(pact, "Pact Broker", "Guarda contratos frontend/backend. Roda local.")

Rel(usuario, webapp, "Usa", "HTTPS")
Rel(webapp, api, "Chama", "JSON/HTTP, axios")
Rel(api, db, "Lê e grava em", "SQL, pg")
Rel(webapp, pact, "Publica contratos em", "HTTP")
Rel(api, pact, "Verifica contratos e publica resultado em", "HTTP")

UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="1")
```

## Legenda

| Container | Tecnologia | Porta |
|---|---|---|
| citei-webapp | React 19, Vite 7, nginx | 80 no container |
| citei-backend | Express 4, TypeORM 0.3 | 3000 no container, 3123 no host |
| PostgreSQL | postgres:16-alpine | 5432 |

Os três containers compartilham a rede Docker `citei-net`.
