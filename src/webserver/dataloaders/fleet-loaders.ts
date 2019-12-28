import { buildDataLoader } from './builder';
import { Ship } from '../../libs/entities/ship';
import { getCustomRepository, getRepository } from 'typeorm';
import { FleetRepository } from '../../libs/repositories';
import { User, Fleet } from '../../libs/entities';

// @ts-ignore
const cvt = <T, W>(src: T) => src as W;

export const fleetLoader = {

  shipsInFleets: () =>
    buildDataLoader<number, Ship[]>({
      async fetcher(keys) {
        return getCustomRepository(FleetRepository)
          .getShipsInFleets(cvt<readonly number[], number[]>(keys));
      },
    }),

  ownerInFleets: () =>
    buildDataLoader<number, User>({
      async fetcher(keys) {
        const fleets =
          await getRepository(Fleet)
            .findByIds(cvt<readonly number[], number[]>(keys), {
              relations: [ 'owner' ],
            });
        return fleets.map((f) => f.owner);
      },
  }),
};
