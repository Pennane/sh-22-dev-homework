import { Application } from 'express';
import { Database } from 'sqlite3';
import { characterConfig } from '../config';
import { handlerTree } from '../handlers';

export type AppConfig = {
  port: number;
  databasePath: string;
  character: typeof characterConfig;
};

export type Character = {
  id: number;
  name: string;
  description: string;
  age: number;
  happiness: number;
  hunger: number;
};

export type Handler<Args extends unknown, ReturnValue extends unknown> = (
  ctx: Context,
  args: Args,
) => Promise<ReturnValue>;

export type DatabaseHandler = <ReturnValue extends unknown>(
  ctx: Context,
  sql: string,
  params?: any[],
) => Promise<ReturnValue>;

export type Context = {
  globals: {
    server: Application;
    db: Database;
    config: AppConfig;
  };
  handlers: typeof handlerTree;
};
