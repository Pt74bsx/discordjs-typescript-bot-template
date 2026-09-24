import { registerCommands } from './handlers/registerCommands';
import { loadCommands } from './handlers/commandLoader';
import { logger } from './utils/logger';

const main = async (): Promise<void> => {
  const commands = loadCommands();
  await registerCommands(commands);
};

main().catch((error: unknown) => {
  logger.error('Déploiement impossible', error);
  process.exitCode = 1;
});
