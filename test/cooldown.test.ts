import { afterEach, describe, expect, it } from 'vitest';
import { clearCooldowns, getCooldownRemaining, setCooldown } from '../src/utils/cooldown';

afterEach(() => clearCooldowns());

describe('cooldowns', () => {
  it('retourne zéro sans cooldown actif', () => {
    expect(getCooldownRemaining('ping', 'user', 2)).toBe(0);
  });

  it('bloque puis expire correctement', async () => {
    setCooldown('ping', 'user', 0.01);
    expect(getCooldownRemaining('ping', 'user', 1)).toBeGreaterThan(0);
    await new Promise((resolve) => setTimeout(resolve, 20));
    expect(getCooldownRemaining('ping', 'user', 1)).toBe(0);
  });
});
