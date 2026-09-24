const buckets = new Map<string, number>();

export const getCooldownRemaining = (commandName: string, userId: string, seconds: number): number => {
  if (seconds <= 0) return 0;
  const key = `${commandName}:${userId}`;
  const expiresAt = buckets.get(key) ?? 0;
  const remaining = expiresAt - Date.now();
  if (remaining <= 0) {
    buckets.delete(key);
    return 0;
  }
  return remaining;
};

export const setCooldown = (commandName: string, userId: string, seconds: number): void => {
  if (seconds <= 0) return;
  buckets.set(`${commandName}:${userId}`, Date.now() + seconds * 1000);
};

export const clearCooldowns = (): void => buckets.clear();
