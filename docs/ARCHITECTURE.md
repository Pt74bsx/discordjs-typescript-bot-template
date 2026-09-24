# Architecture

The project is structured to stay simple for small bots while providing clear boundaries for larger applications.

## Commands

Commands live under `src/commands/` and are organized by domain. The command loader recursively discovers them, so no central registry needs to be edited when a command is added.

## Runtime

`src/index.ts` is responsible for bootstrapping the application:

1. Load commands.
2. Register Discord events.
3. Start the health server.
4. Connect the Discord client.
5. Handle graceful shutdown.

## Deployment

Slash command registration is deliberately separated from runtime startup.

```text
npm run deploy
```

registers commands, while:

```text
npm start
```

only starts the already-built bot.

This avoids unnecessary REST registration on every restart.

## Growth path

The current structure intentionally leaves room for future layers such as:

- services;
- repositories;
- databases;
- caching;
- background jobs;
- metrics;
- sharding.

The template does not force those systems before they are needed.
