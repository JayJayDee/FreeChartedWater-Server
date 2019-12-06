import { ApolloServer } from 'apollo-server';
import { graphQLSchema } from './graphql-schema';
import { log } from '../libs/logger';
import { GeneratingSchemaError } from 'type-graphql';
import { initTypeORM } from '../libs/typeorm-initiator';
import { AllEntities as entities } from '../libs/entities';

const tag = '[graphql-webserver]';

(async () => {

  try {
    const logging = true;
    await initTypeORM({ logging, entities });

    const schema = await graphQLSchema();
    const server = new ApolloServer({
      schema,
      playground: true,
    });

    const { url } = await server.listen(3000);
    log.info(`${tag} GraphQL server started: ${url}`);
  } catch (err) {
    if (err instanceof GeneratingSchemaError) {
      log.error(err.details);
    } else {
      log.error(err);
    }
  }
})();
