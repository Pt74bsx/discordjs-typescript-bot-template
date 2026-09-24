type LogValue = string | number | boolean | null | undefined;

type Fields = Record<string, LogValue>;

const serialize = (fields?: Fields): string => {
  if (!fields) return '';
  const entries = Object.entries(fields).filter(([, value]) => value !== undefined);
  if (entries.length === 0) return '';
  return ` ${entries.map(([key, value]) => `${key}=${JSON.stringify(value)}`).join(' ')}`;
};

const timestamp = (): string => new Date().toISOString();

const formatError = (error: unknown): string => {
  if (error instanceof Error) return error.stack ?? error.message;
  return String(error);
};

export const logger = {
  info(message: string, fields?: Fields): void {
    console.log(`${timestamp()} INFO ${message}${serialize(fields)}`);
  },
  warn(message: string, fields?: Fields): void {
    console.warn(`${timestamp()} WARN ${message}${serialize(fields)}`);
  },
  error(message: string, error?: unknown, fields?: Fields): void {
    const suffix = error === undefined ? '' : ` error=${JSON.stringify(formatError(error))}`;
    console.error(`${timestamp()} ERROR ${message}${suffix}${serialize(fields)}`);
  },
};
