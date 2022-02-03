import { Job } from 'node-schedule';
import { Context } from '../types/global';

import { deteriorate } from './character/deteriorate';
import { age } from './character/age';

const scheduleTree = {
  character: { deteriorate, age },
};

type BaseScheduleTree = {
  [category: string]: {
    [schedule: string]: Job;
  };
};

export type ScheduleTree = {
  [category in keyof typeof scheduleTree]: {
    [schedule in keyof typeof scheduleTree[category]]: Job;
  };
};

const getInitializedScheduleTree = (
  ctx: Omit<Context, 'schedules'>,
): ScheduleTree => {
  const initializedScheduleTree: BaseScheduleTree = {};

  for (const [category, schedules] of Object.entries(scheduleTree)) {
    initializedScheduleTree[category] = {};

    for (const [name, schedule] of Object.entries(schedules)) {
      initializedScheduleTree[category][name] = schedule(ctx);
    }
  }

  return initializedScheduleTree as ScheduleTree;
};

export const withScheduleTree = (ctx: Omit<Context, 'schedules'>): Context => ({
  ...ctx,
  schedules: getInitializedScheduleTree(ctx),
});
