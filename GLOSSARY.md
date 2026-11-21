# Glossary

Each term uses the name in the backend code. The webapp name follows in brackets when it differs.

## Domain

**Colecao** (Coleção) [webapp: `collection`]
A set of quotes by one author. It has a title, an optional subtitle, a cover image and an author.
_Avoid_: album, list

**Citacao** (Citação) [webapp: `quotation`]
One sentence that belongs to exactly one Colecao.
_Avoid_: quote, phrase

**Autor** (Autor)
The person who said or wrote the quotes of a Colecao. One Colecao has one Autor.

## Contracts

**Consumer**
The system that calls the API and depends on it. Here it is `citei-webapp`.

**Provider**
The system that answers the calls. Here it is `citei-backend`.

**Contract**
The written agreement between consumer and provider: which requests the consumer makes and which responses it expects.

**Provider state**
The data situation a contract was recorded in, such as "a Colecao exists" or "no Colecao exists".

**Pact Broker**
The place that stores contracts and verification results.

**Verification**
The provider runs the consumer's contracts and proves it answers as agreed.

## Rules

**Spec**
A Markdown file in `specs/` with a front-matter and a stable ID.

**Approved spec**
A spec with `status: approved`. Only approved specs are rules.
_Avoid_: accepted, active
