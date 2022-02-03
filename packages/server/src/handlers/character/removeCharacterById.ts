import { Handler } from '../../types/global';

export const removeCharacterById: Handler<number, boolean | null> = async (
  ctx,
  id,
) => {
  try {
    const characterBefore = await ctx.handlers.character.getById(ctx, id);

    if (!characterBefore) return false;

    await ctx.handlers.db.run(ctx, `DELETE FROM character WHERE id = (?)`, [
      id,
    ]);

    const characterAfter = await ctx.handlers.character.getById(ctx, id);

    if (characterAfter) throw new Error('Failed to remove a character');

    return true;
  } catch (err) {
    console.error(err);
    return null;
  }
};
