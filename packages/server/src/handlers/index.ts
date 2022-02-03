import { Context } from '../types/global';

import { getAll } from './character/base/getAll';
import { getById } from './character/base/getById';
import { characterCreate } from './character/base/create';
import { characterRemove } from './character/base/remove';

import { happinessIncrease } from './character/happiness/increase';
import { happinessDecrease } from './character/happiness/decrease';

import { hungerIncrease } from './character/hunger/increase';
import { hungerDecrease } from './character/hunger/decrease';

import { ageIncrease } from './character/age/increase';
import { ageDecrease } from './character/age/decrease';

import { one } from './database/one';
import { all } from './database/all';
import { run } from './database/run';

// Add functions here to extend Context.handlers. These functions will be available in call stack where Context is available.
// ctx.handlers.character.base.getAll is just an example. Feel free to refactor and adjust as seen fitting.
// It is also adviseable to think is the database abstraction currently serving our needs.
export const handlerTree = {
  character: {
    base: {
      getAll,
      getById,
      create: characterCreate,
      remove: characterRemove,
    },
    happiness: {
      increase: happinessIncrease,
      decrease: happinessDecrease,
    },
    hunger: {
      increase: hungerIncrease,
      decrease: hungerDecrease,
    },
    age: {
      increase: ageIncrease,
      decrease: ageDecrease,
    },
  },
  db: {
    one,
    all,
    run,
  },
};

export const withHandlerTree = (
  ctx: Omit<Context, 'handlers' | 'schedules'>,
): Omit<Context, 'schedules'> => ({
  ...ctx,
  handlers: handlerTree,
});
