import { createServer, type Server } from 'node:http';

export interface HealthState {
  isReady: () => boolean;
}

const jsonHeaders = {
  'content-type': 'application/json; charset=utf-8',
  'cache-control': 'no-store',
};

export const startHealthServer = (
  port: number,
  host: string,
  state: HealthState,
): Promise<Server> => {
  const server = createServer((request, response) => {
    if (request.method === 'GET' && request.url === '/health') {
      response.writeHead(200, jsonHeaders);
      response.end('{"ok":true}');
      return;
    }

    if (request.method === 'GET' && request.url === '/ready') {
      const ready = state.isReady();
      response.writeHead(ready ? 200 : 503, jsonHeaders);
      response.end(JSON.stringify({ ok: ready }));
      return;
    }

    response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' });
    response.end('Not Found');
  });

  return new Promise((resolve, reject) => {
    const onError = (error: Error): void => {
      server.off('listening', onListening);
      reject(error);
    };
    const onListening = (): void => {
      server.off('error', onError);
      resolve(server);
    };
    server.once('error', onError);
    server.once('listening', onListening);
    server.listen(port, host);
  });
};

export const closeHealthServer = (server: Server): Promise<void> => {
  if (!server.listening) return Promise.resolve();
  return new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
};
