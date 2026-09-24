import 'dotenv/config';

export type Environment = 'development' | 'test' | 'production';

const required = (name: string): string => {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Variable d'environnement manquante : ${name}`);
  }
  return value;
};

const optional = (name: string): string | undefined => {
  const value = process.env[name]?.trim();
  return value || undefined;
};

const snowflake = (name: string, value: string): string => {
  if (!/^\d{17,20}$/.test(value)) {
    throw new Error(`${name} doit être un Snowflake Discord valide.`);
  }
  return value;
};

const environment = (): Environment => {
  const value = process.env['NODE_ENV']?.trim() || 'development';
  if (value !== 'development' && value !== 'test' && value !== 'production') {
    throw new Error('NODE_ENV doit valoir development, test ou production.');
  }
  return value;
};

const port = (): number => {
  const raw = process.env['HEALTH_PORT']?.trim() || '3000';
  const value = Number(raw);
  if (!Number.isInteger(value) || value < 1 || value > 65_535) {
    throw new Error('HEALTH_PORT doit être un entier compris entre 1 et 65535.');
  }
  return value;
};

export const config = {
  token: required('DISCORD_TOKEN'),
  clientId: snowflake('CLIENT_ID', required('CLIENT_ID')),
  guildId: optional('GUILD_ID'),
  environment: environment(),
  healthHost: process.env['HEALTH_HOST']?.trim() || '127.0.0.1',
  healthPort: port(),
} as const;

if (config.guildId) {
  snowflake('GUILD_ID', config.guildId);
}
