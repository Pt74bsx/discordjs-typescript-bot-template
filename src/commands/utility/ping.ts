import { SlashCommandBuilder } from 'discord.js';
import type { ChatInputCommandInteraction } from 'discord.js';
import type { Command } from '../../types/command';

const ping: Command = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Affiche la latence du bot et du Gateway Discord'),
  cooldown: 2,
  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const startedAt = performance.now();
    const gatewayLatency = Math.max(0, Math.round(interaction.client.ws.ping));
    const processingTime = Math.max(0, Math.round(performance.now() - startedAt));

    await interaction.reply(
      `Pong ! • Traitement : ${processingTime} ms • Gateway : ${gatewayLatency} ms`,
    );
  },
};

export default ping;
