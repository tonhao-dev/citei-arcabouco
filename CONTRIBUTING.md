# Como contribuir

## Dono

O Luis é o único dono das regras. O merge dele na `main` aprova a mudança.

## Criar uma spec

1. Escolha o prefixo pelo tipo.

| Prefixo | `spec_type` | Pasta |
|---|---|---|
| `ARCH` | `architecture` | `specs/architecture/` |
| `ADR` | `adr` | `specs/adr/` |
| `SEC` | `security` | `specs/security/` |
| `STD` | `standard` | `specs/standards/` |
| `AI` | `ai-guideline` | `specs/ai/` |

2. Use o próximo número livre do prefixo. Nunca reutilize um ID.
3. Dê ao arquivo o nome `<ID>-<assunto>.md`.
4. Comece o arquivo com este front-matter:

```yaml
---
spec_id: STD-004
title: Short title
spec_type: standard
status: draft
owner: luis
last_updated: 2026-11-21
tags: [tag]
replacement: null
---
```

5. Rode `npm run index` e depois `npm run validate`.
6. Faça o commit com Conventional Commits, por exemplo `docs(std): add STD-004 logging`.

## Status

| Status | Significa |
|---|---|
| `draft` | Proposta. A IA não trata como regra. |
| `approved` | Regra em vigor. Só o Luis põe este status. |
| `deprecated` | Fora de uso. O campo `replacement` aponta a spec nova. |

## Citar uma spec

- Cite pelo ID entre colchetes, como `[STD-001]`. O `validate` confere se o ID existe.
- Não cite pelo caminho. O `INDEX.md` resolve o ID.

## Idioma

- Spec, steering e glossário: inglês, porque a IA lê.
- ADR, C4, README e este arquivo: pt-BR, porque o humano lê.

## Steering

- Ponha só ponteiros no steering. A regra mora uma vez, em `specs/`.
- O steering `always` tem no máximo 150 linhas no total. O `validate` mede.
- Use um array em `fileMatchPattern`. Não junte padrões com vírgula.
- Os caminhos do `fileMatch` partem da pasta-mãe, como `citei-webapp/**`.
