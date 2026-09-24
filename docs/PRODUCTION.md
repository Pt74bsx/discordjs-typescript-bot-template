# Production

## Recommended cycle

1. Install dependencies with `npm install`.
2. Run `npm run verify`.
3. Build with `npm run build`.
4. Deploy slash commands with `npm run deploy`.
5. Start with `npm start`.
6. Monitor `/health` and `/ready`.

Command deployment is intentionally separate from runtime startup.

## Environment

Never commit `.env` or the Discord token.

Use a secret manager provided by your hosting platform for production deployments.

## Health checks

Use:

```text
GET /health
GET /ready
```

`/health` verifies that the HTTP process is alive.

`/ready` verifies that the Discord client has reached the ready state.

## Scaling path

For a larger deployment, consider adding:

- PostgreSQL for durable state;
- Redis for distributed caching and coordination;
- background workers for expensive jobs;
- centralized metrics and logs;
- Discord sharding when required by the deployment size.

Add infrastructure when the project actually needs it rather than making every installation depend on it.
