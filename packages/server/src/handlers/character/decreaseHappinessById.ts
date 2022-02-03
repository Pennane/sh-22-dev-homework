import { Character, Handler } from '../../types/global';

export const decreaseHappinessById: Handler<number, Character | null> = async (
  ctx,
  id,
) => {
  try {
    await ctx.handlers.db.one(
      ctx,
      'UPDATE character SET happiness = happiness - 1 WHERE id = ?',
      [id],
    );
    return await ctx.handlers.character.getById(ctx, id);
  } catch {
    return null;
  }
};
