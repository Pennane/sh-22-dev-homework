import { DatabaseHandler } from '../../types/global';

export const all: DatabaseHandler = (ctx, sql, params) =>
  new Promise((resolve, reject) => {
    ctx.globals.db.all(sql, params, (err, result) => {
      if (err) {
        reject(err);
      }

      // TODO: Fix DatabaseHandler type rather than converting the result type with 'as' keyword
      //@ts-expect-error
      resolve(result);
    });
  });
