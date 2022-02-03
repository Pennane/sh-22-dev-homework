import { buildSchema } from 'graphql';
import { Context } from '../types/global';

export const graphQLSchema = buildSchema(`
  type Character {
    id: Int!
    name: String!
    description: String!
    age: Int!
    happiness: Int!
    hunger: Int!
  }

  type Query {
    characters: [Character]
    character(id:Int!): Character
  }

  type Mutation {
    petCharacter(id:Int!): Character
    feedCharacter(id:Int!): Character
    createCharacter(name:String!, description:String!): Character
    removeCharacter(id:Int!): Boolean
  }
`);

// Passing in ctx to all resolvers for dependency injection
// All resolvers have access to all handlers and globals
export const createResolvers = (ctx: Context) => {
  return {
    characters: () => ctx.handlers.character.base.getAll(ctx, {}),
    character: ({ id }: { id: number }) =>
      ctx.handlers.character.base.getById(ctx, { id }),
    petCharacter: ({ id }: { id: number }) =>
      ctx.handlers.character.happiness.increase(ctx, { id }),
    feedCharacter: ({ id }: { id: number }) =>
      ctx.handlers.character.hunger.decrease(ctx, { id }),
    createCharacter: ({
      name,
      description,
    }: {
      name: string;
      description: string;
    }) =>
      ctx.handlers.character.base.create(ctx, {
        name,
        description,
      }),
    removeCharacter: ({ id }: { id: number }) =>
      ctx.handlers.character.base.remove(ctx, { id }),
  };
};
