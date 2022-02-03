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
  }
`);

// Passing in ctx to all resolvers for dependency injection
// All resolvers have access to all handlers and globals
export const createResolvers = (ctx: Context) => {
  return {
    characters: ctx.handlers.character.getAll(ctx, {}),
    character: ({ id }: { id: number }) =>
      ctx.handlers.character.getById(ctx, id),
    petCharacter: ({ id }: { id: number }) =>
      ctx.handlers.character.petById(ctx, id),
  };
};
