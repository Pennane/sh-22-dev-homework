import cron from 'node-schedule';
import R from 'ramda';
import appConfig from '../../config';
import { Schedule } from '../../types/global';

export const deteriorate: Schedule = ctx => {
  const frequency = Math.round(
    R.clamp(1, 60, appConfig.character.deteriorateFrequency),
  );
  return cron.scheduleJob(`*/${frequency} * * * *`, async () => {
    try {
      const characters = await ctx.handlers.character.getAll(ctx, {});

      if (!characters) return;

      await Promise.all(
        characters.map(async character => {
          if (character.hunger < appConfig.character.hunger.max) {
            await ctx.handlers.character.increaseHungerById(ctx, character.id);
            return;
          }

          if (character.happiness > appConfig.character.happiness.min) {
            await ctx.handlers.character.decreaseHappinessById(
              ctx,
              character.id,
            );
            return;
          }
        }),
      );
    } catch (err) {
      console.error(err);
    }
  });
};
