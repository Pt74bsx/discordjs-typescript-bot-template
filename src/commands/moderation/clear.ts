import {
  MessageFlags,
  PermissionFlagsBits,
  SlashCommandBuilder,
  TextChannel,
} from 'discord.js';
import type { ChatInputCommandInteraction } from 'discord.js';
import type { Command } from '../../types/command';
import { UserFacingError } from '../../utils/errors';

const clear: Command = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Supprime plusieurs messages récents du salon')
    .addIntegerOption((option) =>
      option
        .setName('amount')
        .setDescription('Nombre de messages à supprimer (1 à 100)')
        .setMinValue(1)
        .setMaxValue(100)
        .setRequired(true),
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .setDMPermission(false),
  cooldown: 3,
  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    if (!interaction.inGuild() || !(interaction.channel instanceof TextChannel)) {
      throw new UserFacingError('Cette commande fonctionne uniquement dans un salon textuel classique.');
    }

    if (!interaction.memberPermissions?.has(PermissionFlagsBits.ManageMessages)) {
      throw new UserFacingError('Tu n’as pas la permission de gérer les messages.');
    }

    const me = interaction.guild?.members.me;
    if (!me || !interaction.channel.permissionsFor(me)?.has(PermissionFlagsBits.ManageMessages)) {
      throw new UserFacingError('Le bot n’a pas la permission de gérer les messages dans ce salon.');
    }

    const amount = interaction.options.getInteger('amount', true);
    const deleted = await interaction.channel.bulkDelete(amount, true);

    await interaction.reply({
      content: `${deleted.size} message${deleted.size > 1 ? 's' : ''} supprimé${deleted.size > 1 ? 's' : ''}`,
      flags: MessageFlags.Ephemeral,
    });
  },
};

export default clear;
