# Contributing

Thanks for contributing to the template.

## Before opening a Pull Request

```bash
npm install
npm run verify
```

A Pull Request should:

- keep TypeScript strict;
- add or update relevant tests;
- pass ESLint and Prettier;
- avoid unnecessary dependencies;
- never introduce secrets;
- preserve a simple and extensible architecture.

## Adding a command

Place the command in the category matching its responsibility:

- `administration/`
- `automation/`
- `configuration/`
- `economy/`
- `fun/`
- `information/`
- `moderation/`
- `owner/`
- `tickets/`
- `utility/`

Automatic discovery handles command registration.

## Commit style

Prefer focused commits such as:

```text
feat(commands): add moderation warn command
test(loader): cover duplicate command detection
docs: improve production guide
fix(config): validate health port
```

## Maintainer

This project is maintained by **[Pt74bsx (Romain-Augusto)](https://github.com/Pt74bsx)**.

