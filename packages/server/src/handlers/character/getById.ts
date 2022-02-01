import { Character, Handler } from '../../types/global';

export const getById: Handler<number, Character | null | Error> = (ctx, id) => {
  return new Promise((resolve, reject) => {
    return ctx.globals.db.get(
      'SELECT * FROM character WHERE id = ?',
      [id],
      (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result || null);
      },
    );
  });
};
