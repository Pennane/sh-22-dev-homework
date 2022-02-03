import appConfig from '../../config';
import { Character, Handler } from '../../types/global';

export const decreaseAgeById: Handler<number, Character | null> = async (
  ctx,
  id,
) => {
  try {
    await ctx.handlers.db.one(
      ctx,
      'UPDATE character SET age = age - 1 WHERE id = ? AND age > ?',
      [id, appConfig.character.age.min],
    );
    return await ctx.handlers.character.getById(ctx, id);
  } catch (err) {
    console.error(err);
    return null;
  }
};
