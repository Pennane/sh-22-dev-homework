import cron from 'node-schedule';
import R from 'ramda';
import appConfig from '../../config';
import { Schedule } from '../../types/global';

export const age: Schedule = ctx => {
  const frequency = Math.round(
    R.clamp(1, 60, appConfig.character.agingFrequency),
  );
  return cron.scheduleJob(`*/${frequency} * * * *`, async () => {
    try {
      const characters = await ctx.handlers.character.getAll(ctx, {});

      if (!characters) return;

      await Promise.all(
        characters.map(async character => {
          if (character.age >= appConfig.character.age.max) {
            return;
          }

          await ctx.handlers.character.increaseAgeById(ctx, character.id);
        }),
      );
    } catch (err) {
      console.error(err);
    }
  });
};
