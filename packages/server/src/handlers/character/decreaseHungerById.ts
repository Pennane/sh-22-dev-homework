import appConfig from '../../config';
import { Character, Handler } from '../../types/global';

export const decreaseHungerById: Handler<number, Character | null> = async (
  ctx,
  id,
) => {
  try {
    await ctx.handlers.db.one(
      ctx,
      'UPDATE character SET hunger = hunger - 1 WHERE id = ? AND hunger > ?',
      [id, appConfig.character.hunger.min],
    );
    return await ctx.handlers.character.getById(ctx, id);
  } catch {
    return null;
  }
};
