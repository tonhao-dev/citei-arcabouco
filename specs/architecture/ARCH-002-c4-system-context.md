---
spec_id: ARCH-002
title: C4 nível 1, contexto do sistema
spec_type: architecture
status: draft
owner: luis
last_updated: 2026-11-21
tags: [architecture, c4]
replacement: null
---

# Citei: System Context (C4, nível 1)

```mermaid
C4Context
title System Context View: Citei

Person(usuario, "Usuário", "Pessoa que guarda e lê citações de autores, organizadas em coleções.")
Person(dev, "Desenvolvedor", "Pessoa que mantém o Citei e publica novas versões.")

System(citei, "Citei", "Permite criar coleções de citações de um autor e ler as citações pelo navegador.")

System_Ext(pact, "Pact Broker", "Guarda os contratos entre frontend e backend e os resultados das verificações. Roda só na máquina local.")
System_Ext(snyk, "Snyk", "Serviço em nuvem que procura falhas de segurança nas dependências, no código e na imagem Docker.")

Rel(usuario, citei, "Cria coleções e lê citações usando", "HTTPS, navegador")
Rel(dev, citei, "Mantém e publica")
Rel(citei, pact, "Publica contratos e resultados de verificação em", "HTTP")
Rel(citei, snyk, "Envia relatórios de segurança para", "HTTPS")
Rel(dev, pact, "Consulta can-i-deploy em")

UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="1")
```

## Legenda

| Elemento | Tipo | Observação |
|---|---|---|
| Usuário | Pessoa | Usa o Citei no navegador. |
| Desenvolvedor | Pessoa | Mantém o código e roda os testes. |
| Citei | Sistema | Frontend (`citei-webapp`), API (`citei-backend`) e banco PostgreSQL. No nível 1 eles formam uma caixa só. |
| Pact Broker | Sistema externo | Só em desenvolvimento. |
| Snyk | Sistema externo | Só em desenvolvimento. |
