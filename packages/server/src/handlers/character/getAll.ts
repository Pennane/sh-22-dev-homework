import { Character, Handler } from '../../types/global';

export const getAll: Handler<unknown, Character[] | null> = async (
  ctx,
  _input,
) => {
  try {
    const characters = await ctx.handlers.db.all<Character[]>(
      ctx,
      'SELECT * FROM character',
      [],
    );
    return characters;
  } catch {
    return null;
  }
};
