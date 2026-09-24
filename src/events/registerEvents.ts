import { Events, type Client } from 'discord.js';
import type { Command } from '../types/command';
import { handleCommand } from '../handlers/commandHandler';
import { logger } from '../utils/logger';

export interface RuntimeState {
  setReady: (ready: boolean) => void;
}

export const registerEvents = (
  client: Client,
  commands: ReadonlyMap<string, Command>,
  state: RuntimeState,
): void => {
  client.once(Events.ClientReady, (readyClient) => {
    state.setReady(true);
    logger.info('Bot prêt', { tag: readyClient.user.tag, commands: commands.size });
  });

  client.on(Events.InteractionCreate, (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    void handleCommand(interaction, commands);
  });

  client.on(Events.Error, (error) => logger.error('Erreur Discord.js', error));
  client.on(Events.Warn, (message) => logger.warn('Avertissement Discord.js', { message }));
};
