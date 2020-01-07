import { MiddlewareFn } from 'type-graphql';
import DataLoader from 'dataloader';
import { FCWContext } from '../context';
import { Ship, User, SeaSection, Fleet, City } from '../../libs/entities';

import { fleetLoader } from './fleet-loader';
import { userLoader } from './user-loader';

export type DataLoders = {
  fleet: {
    ships(): DataLoader<number, Ship[]>;
    owner(): DataLoader<number, User>;
    seaSection(): DataLoader<number, SeaSection | null>;
    anchoredCity(): DataLoader<number, City | null>;
  },
  user: {
    fleets(): DataLoader<number, Fleet[]>;
  },
};

export const dataLoaders: MiddlewareFn<FCWContext> =
  async ({ context }, next) => {
    context._loaderInstances = {};
    const loaderStore = context._loaderInstances;

    context.loaders = {
      fleet: fleetLoader({ loaderStore }),
      user: userLoader({ loaderStore }),
    };
    return await next();
  };
