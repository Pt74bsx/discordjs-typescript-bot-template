# Creating a Command

Create a TypeScript file inside the category that matches the command's responsibility.

Example:

```text
src/commands/utility/example.ts
```

A minimal command looks like:

```ts
import { SlashCommandBuilder } from 'discord.js';
import type { ChatInputCommandInteraction } from 'discord.js';
import type { Command } from '../../types/command';

const example: Command = {
  data: new SlashCommandBuilder()
    .setName('example')
    .setDescription('Example command'),

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    await interaction.reply('Hello!');
  },
};

export default example;
```

The loader discovers the command automatically.

You do not need to edit a central command registry.

## Guidelines

- Keep Discord interaction code small.
- Move complex business logic into services as the project grows.
- Validate permissions and inputs.
- Add tests for important behavior.
- Keep commands inside the domain they belong to.
