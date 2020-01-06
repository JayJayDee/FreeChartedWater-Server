import { buildSchema } from 'type-graphql';
import { graphQLResolvers } from './resolvers';
import { dataLoaders } from './dataloaders';

export const graphQLSchema =
  async () => {
    const resolvers = graphQLResolvers();
    const schema = buildSchema({
      resolvers,
      globalMiddlewares: [ dataLoaders ],
    });
    return schema;
  };
