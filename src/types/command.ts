import type {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
} from 'discord.js';

export type CommandData = SlashCommandBuilder | SlashCommandOptionsOnlyBuilder;

export interface Command {
  readonly data: CommandData;
  readonly cooldown?: number;
  readonly execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

export interface CommandModule {
  readonly default: Command;
}
