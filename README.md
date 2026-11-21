# Citei Arcabouço

Este repositório guarda as regras, as decisões e a documentação do Citei.
Ele serve para humanos e para agentes de IA.
Os repositórios de código (`citei-backend` e `citei-webapp`) têm só o `README.md`.

## O que tem aqui

| Caminho | Conteúdo | Idioma |
|---|---|---|
| `INDEX.md` | Lista das specs, gerada | inglês |
| `GLOSSARY.md` | Termos do domínio | inglês |
| `specs/architecture/` | Visão do sistema e C4 | inglês e pt-BR |
| `specs/adr/` | Decisões | pt-BR |
| `specs/security/` | Segurança | inglês |
| `specs/standards/` | Padrões de código, testes e commits | inglês |
| `specs/ai/` | Conduta do agente | inglês |
| `.kiro/steering/` | O que o Kiro Crew carrega | inglês |
| `schema/` | Schema do front-matter | inglês |
| `tools/` | `validate` e `index` | inglês |

A regra do idioma: o que a IA lê fica em inglês. O que o humano lê fica em pt-BR.

## Como usar

1. Clone o repositório em `c:\dev\citei\citei-arcabouco`.
2. Rode `npm install`. Isso instala o hook `pre-commit`.
3. Crie a junção do `.kiro` uma vez por máquina:

```powershell
New-Item -ItemType Junction -Path C:\dev\citei\.kiro -Target C:\dev\citei\citei-arcabouco\.kiro
```

4. Abra o Kiro Crew com o projeto em `c:\dev\citei`.

O motivo da junção está no [ADR-002](specs/adr/ADR-002-pasta-mae-e-juncao-kiro.md).

## Comandos

| Comando | Faz |
|---|---|
| `npm run index` | Gera o `INDEX.md` a partir do front-matter |
| `npm run validate` | Confere schema, IDs, status, links, índice e teto do steering |

O `pre-commit` roda o `validate`. Um erro bloqueia o commit.

Leia o [CONTRIBUTING.md](CONTRIBUTING.md) antes de mudar uma spec.
