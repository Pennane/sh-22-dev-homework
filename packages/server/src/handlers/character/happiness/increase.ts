import appConfig from '../../../config';
import { Character, Handler } from '../../../types/global';

export const happinessIncrease: Handler<
  { id: number },
  Character | null
> = async (ctx, { id }) => {
  try {
    await ctx.handlers.db.one(
      ctx,
      'UPDATE character SET happiness = happiness + 1 WHERE id = ? AND happiness < ?',
      [id, appConfig.character.happiness.max],
    );
    return await ctx.handlers.character.base.getById(ctx, { id });
  } catch (err) {
    console.error(err);
    return null;
  }
};
