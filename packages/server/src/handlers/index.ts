import { Context } from '../types/global';

import { getAll } from './character/getAll';
import { getById } from './character/getById';
import { increaseHappinessById } from './character/increaseHappinessById';
import { decreaseHappinessById } from './character/decreaseHappinessById';
import { increaseHungerById } from './character/increaseHungerById';
import { decreaseHungerById } from './character/decreaseHungerById';
import { createCharacter } from './character/createCharacter';
import { removeCharacterById } from './character/removeCharacterById';

import { one } from './database/one';
import { all } from './database/all';
import { run } from './database/run';

// Add functions here to extend Context.handlers. These functions will be available in call stack where Context is available.
// ctx.handlers.character.getAll is just an example. Feel free to refactor and adjust as seen fitting.
// It is also adviseable to think is the database abstraction currently serving our needs.
export const handlerTree = {
  character: {
    getAll,
    getById,
    increaseHappinessById,
    decreaseHappinessById,
    increaseHungerById,
    decreaseHungerById,
    createCharacter,
    removeCharacterById,
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
