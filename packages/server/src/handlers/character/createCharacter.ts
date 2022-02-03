import { Character, Handler } from '../../types/global';

export const createCharacter: Handler<
  { name: string; description: string },
  Character | null
> = async (ctx, { name, description }) => {
  try {
    // Insert new character
    await ctx.handlers.db.run(
      ctx,
      `INSERT INTO character (name, description) VALUES (?, ?)`,
      [name, description],
    );

    // Get inserted character
    const character = await ctx.handlers.db.one<Character>(
      ctx,
      `SELECT * FROM character WHERE id = last_insert_rowid()`,
      [],
    );

    if (!character) return null;

    return character;
  } catch (err) {
    console.log(err);

    return null;
  }
};
