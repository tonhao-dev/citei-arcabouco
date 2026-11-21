---
spec_id: ADR-002
title: A pasta-mãe é a raiz, e o .kiro chega a ela por junção
spec_type: adr
status: draft
owner: luis
last_updated: 2026-11-21
tags: [kiro, workspace, docs]
replacement: null
---

# A pasta-mãe é a raiz, e o `.kiro` chega a ela por junção

## Contexto

- O Luis abre o Citei pela pasta-mãe `c:\dev\citei`, no Kiro Crew. Ele não usa o Kiro IDE.
- A pasta-mãe não é um repositório git.
- O Kiro Crew carrega o steering de `<projeto>\.kiro\steering\`. Ele não carrega o `.kiro` de um repositório interno.
- O Luis quer todo Markdown de regra e de documentação num só repositório, o `citei-arcabouco`. Os repositórios de código ficam só com o `README.md`.

## Decisão

- O `.kiro` mora em `citei-arcabouco\.kiro`, versionado.
- A pasta `c:\dev\citei\.kiro` é uma junção do Windows que aponta para `citei-arcabouco\.kiro`.
- O steering `fileMatch` usa caminhos a partir da pasta-mãe, como `citei-webapp/**`.
- Não há `AGENTS.md`, `GLOSSARY.md` nem `docs/` nos repositórios de código.

Crie a junção numa máquina nova com:

```powershell
New-Item -ItemType Junction -Path C:\dev\citei\.kiro -Target C:\dev\citei\citei-arcabouco\.kiro
```

## Alternativas descartadas

- Fazer da pasta-mãe o repositório. Ela tem `talks`, `projects` e `apresentacao`, que não são do Citei.
- Copiar o steering para cada repositório, com `sync` e lock. São peças a mais para um dono só.
- Steering global em `~/.kiro/steering`. Ele vale para todos os projetos da máquina.

## Consequências

- Uma edição em `c:\dev\citei\.kiro` muda o arquivo do arcabouço, porque é o mesmo arquivo.
- Quem abre só `citei-webapp` ou `citei-backend` não recebe regra nenhuma. Peça ao agente para ler o `citei-arcabouco`.
- A junção não vai para o git. Cada máquina precisa criá-la uma vez.
- Para desfazer, rode `cmd /c rmdir C:\dev\citei\.kiro`. Isso apaga só a junção. Não use `Remove-Item -Recurse`: no Windows PowerShell 5.1 ele pode apagar o conteúdo do alvo.
