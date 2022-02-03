import appConfig from '../../../config';
import { Character, Handler } from '../../../types/global';

export const hungerIncrease: Handler<{ id: number }, Character | null> = async (
  ctx,
  { id },
) => {
  try {
    await ctx.handlers.db.one(
      ctx,
      'UPDATE character SET hunger = hunger + 1 WHERE id = ? AND hunger < ?',
      [id, appConfig.character.hunger.max],
    );
    return await ctx.handlers.character.base.getById(ctx, { id });
  } catch (err) {
    console.error(err);
    return null;
  }
};
