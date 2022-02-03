import { DatabaseHandler } from '../../types/global';

export const run: DatabaseHandler = (ctx, sql, params) =>
  new Promise((resolve, reject) => {
    ctx.globals.db.run(sql, params, (err: Error | null, result: any) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
