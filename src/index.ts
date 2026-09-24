import { Client, GatewayIntentBits } from 'discord.js';
import { config } from './config/env';
import { registerEvents } from './events/registerEvents';
import { loadCommands } from './handlers/commandLoader';
import { closeHealthServer, startHealthServer } from './healthServer';
import { logger } from './utils/logger';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

let ready = false;
let shuttingDown = false;
let healthServer: Awaited<ReturnType<typeof startHealthServer>> | undefined;

const shutdown = async (reason: string, exitCode = 0): Promise<void> => {
  if (shuttingDown) return;
  shuttingDown = true;
  ready = false;
  logger.info('Arrêt du bot', { reason });

  try {
    if (healthServer) await closeHealthServer(healthServer);
    client.destroy();
  } catch (error) {
    logger.error('Erreur pendant l’arrêt', error);
    exitCode = 1;
  } finally {
    process.exitCode = exitCode;
  }
};

const start = async (): Promise<void> => {
  const commands = loadCommands();

  registerEvents(client, commands, {
    setReady: (value) => {
      ready = value;
    },
  });

  healthServer = await startHealthServer(config.healthPort, config.healthHost, { isReady: () => ready });
  await client.login(config.token);
};

process.once('SIGINT', () => {
  void shutdown('SIGINT');
});

process.once('SIGTERM', () => {
  void shutdown('SIGTERM');
});

process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled rejection', reason);
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught exception', error);
  void shutdown('uncaughtException', 1);
});

void start().catch((error: unknown) => {
  logger.error('Démarrage impossible', error);
  void shutdown('startup failure', 1);
});
