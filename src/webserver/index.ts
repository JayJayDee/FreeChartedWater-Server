import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { GeneratingSchemaError } from 'type-graphql';
import express from 'express';

import { log } from '../libs/logger';
import { loadConfig } from '../libs/configs';
import { initTypeORM } from '../libs/typeorm-initiator';
import { AllEntities as entities } from '../libs/entities';

import { graphQLSchema } from './graphql-schema';

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

    const port = loadConfig('WEBSERVER_PORT');
    const app = express();

    server.applyMiddleware({ app, path: '/graphql' });

    app.listen(port, () => {
      log.info(`${tag} GraphQL server started, port:${port}`);
    });

  } catch (err) {
    if (err instanceof GeneratingSchemaError) {
      log.error(err.details);
    } else {
      log.error(err);
    }
  }
})();
