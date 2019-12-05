import { buildSchema } from 'type-graphql';
import { graphQLResolvers } from './resolvers';

export const graphQLSchema =
  async () => {
    const resolvers = graphQLResolvers();
    const schema = buildSchema({
      resolvers,
    });
    return schema;
  };
