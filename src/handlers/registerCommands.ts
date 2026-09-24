import { REST, Routes } from 'discord.js';
import type { Command } from '../types/command';
import { config } from '../config/env';
import { logger } from '../utils/logger';

export const registerCommands = async (commands: ReadonlyMap<string, Command>): Promise<void> => {
  const rest = new REST({ version: '10' }).setToken(config.token);
  const route = config.guildId
    ? Routes.applicationGuildCommands(config.clientId, config.guildId)
    : Routes.applicationCommands(config.clientId);

  await rest.put(route, { body: [...commands.values()].map(({ data }) => data.toJSON()) });
  logger.info('Commandes Discord déployées', {
    scope: config.guildId ? 'guild' : 'global',
    count: commands.size,
  });
};
