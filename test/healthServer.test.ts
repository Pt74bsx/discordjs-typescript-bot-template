import { afterEach, describe, expect, it } from 'vitest';
import { closeHealthServer, startHealthServer } from '../src/healthServer';

const servers: Awaited<ReturnType<typeof startHealthServer>>[] = [];

afterEach(async () => {
  while (servers.length > 0) {
    const server = servers.pop();
    if (server) await closeHealthServer(server);
  }
});

describe('health server', () => {
  it('expose /health sans dépendre de Discord', async () => {
    const server = await startHealthServer(0, '127.0.0.1', { isReady: () => false });
    servers.push(server);
    const address = server.address();
    expect(address).not.toBeNull();
    if (!address || typeof address === 'string') throw new Error('Adresse invalide');

    const response = await fetch(`http://127.0.0.1:${address.port}/health`);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
  });

  it('retourne 503 avant la readiness', async () => {
    const server = await startHealthServer(0, '127.0.0.1', { isReady: () => false });
    servers.push(server);
    const address = server.address();
    if (!address || typeof address === 'string') throw new Error('Adresse invalide');

    const response = await fetch(`http://127.0.0.1:${address.port}/ready`);
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ ok: false });
  });

  it('retourne 200 quand le bot est prêt', async () => {
    const server = await startHealthServer(0, '127.0.0.1', { isReady: () => true });
    servers.push(server);
    const address = server.address();
    if (!address || typeof address === 'string') throw new Error('Adresse invalide');

    const response = await fetch(`http://127.0.0.1:${address.port}/ready`);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
  });

  it('retourne 404 pour une route inconnue', async () => {
    const server = await startHealthServer(0, '127.0.0.1', { isReady: () => true });
    servers.push(server);
    const address = server.address();
    if (!address || typeof address === 'string') throw new Error('Adresse invalide');

    const response = await fetch(`http://127.0.0.1:${address.port}/unknown`);
    expect(response.status).toBe(404);
  });
});
