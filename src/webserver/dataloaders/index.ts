import { MiddlewareFn } from 'type-graphql';
import DataLoader from 'dataloader';
import { FCWContext } from '../context';
import { Ship, User, SeaSection } from '../../libs/entities';

import { fleetLoader } from './fleet-loader';

export type DataLoders = {
  fleet: {
    ships(): DataLoader<number, Ship[]>;
    owner(): DataLoader<number, User>;
    seaSection(): DataLoader<number, SeaSection>;
  },
};

export const dataLoaders: MiddlewareFn<FCWContext> =
  async ({ context }, next) => {
    context._loaderInstances = {};
    context.loaders = {
      fleet: fleetLoader({ loaderStore: context._loaderInstances }),
    };
    return await next();
  };
