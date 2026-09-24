import { readdirSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import type { Command, CommandModule } from '../types/command';
import { logger } from '../utils/logger';

const commandsDirectory = join(__dirname, '..', 'commands');

const filesRecursively = (directory: string, extension: '.js' | '.ts'): string[] => {
  const files: string[] = [];

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...filesRecursively(path, extension));
      continue;
    }

    if (entry.isFile() && path.endsWith(extension) && !path.endsWith('.d.ts')) {
      files.push(path);
    }
  }

  return files;
};

const commandExtension = (): '.js' | '.ts' => {
  // `tsx` executes directly from src, while the production build executes from dist.
  return __dirname.split(sep).includes('dist') ? '.js' : '.ts';
};

export const loadCommands = (): Map<string, Command> => {
  const commands = new Map<string, Command>();
  const extension = commandExtension();

  for (const file of filesRecursively(commandsDirectory, extension).sort()) {
    const relativePath = relative(commandsDirectory, file).split(sep).join('/');
    const module = require(file) as CommandModule;
    const command = module.default;

    if (!command?.data?.name || typeof command.execute !== 'function') {
      throw new Error(`Commande invalide : ${relativePath}`);
    }

    if (commands.has(command.data.name)) {
      throw new Error(`Commande dupliquée : /${command.data.name}`);
    }

    commands.set(command.data.name, command);
  }

  logger.info('Commandes chargées', { count: commands.size });
  return commands;
};
