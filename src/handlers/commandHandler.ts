import {
  MessageFlags,
  type ChatInputCommandInteraction,
  type InteractionReplyOptions,
} from 'discord.js';
import type { Command } from '../types/command';
import { getCooldownRemaining, setCooldown } from '../utils/cooldown';
import { UserFacingError } from '../utils/errors';
import { logger } from '../utils/logger';

const errorReply: InteractionReplyOptions = {
  content: 'Une erreur interne est survenue. Réessaie dans quelques instants.',
  flags: MessageFlags.Ephemeral,
};

export const handleCommand = async (
  interaction: ChatInputCommandInteraction,
  commands: ReadonlyMap<string, Command>,
): Promise<void> => {
  const command = commands.get(interaction.commandName);
  if (!command) {
    logger.warn('Commande inconnue', { command: interaction.commandName });
    if (!interaction.replied && !interaction.deferred) {
      await interaction.reply({ content: 'Cette commande n’existe plus.', flags: MessageFlags.Ephemeral });
    }
    return;
  }

  const cooldown = command.cooldown ?? 0;
  const remaining = getCooldownRemaining(command.data.name, interaction.user.id, cooldown);
  if (remaining > 0) {
    const seconds = Math.ceil(remaining / 1000);
    await interaction.reply({
      content: `⏳ Réessaie dans ${seconds} seconde${seconds > 1 ? 's' : ''}.`,
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  try {
    await command.execute(interaction);
    setCooldown(command.data.name, interaction.user.id, cooldown);
  } catch (error) {
    logger.error('Échec de commande', error, { command: command.data.name });
    const content = error instanceof UserFacingError ? error.userMessage : errorReply.content;
    const reply: InteractionReplyOptions = { content, flags: MessageFlags.Ephemeral };
    try {
      if (interaction.replied || interaction.deferred) await interaction.followUp(reply);
      else await interaction.reply(reply);
    } catch (replyError) {
      logger.error('Impossible de répondre à l’interaction', replyError, { command: command.data.name });
    }
  }
};
