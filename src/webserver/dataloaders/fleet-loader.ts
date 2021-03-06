import DataLoader from 'dataloader';
import { getRepository } from 'typeorm';
import { Ship, Fleet, User, SeaSection, City } from '../../libs/entities';
import { loadOrCreate } from './util';

export const fleetLoader = ({ loaderStore }: {
  loaderStore: {[key: string]: any},
}) => ({
  ships: () =>
    loadOrCreate<number, Ship[]>({
      loaderStore,
      key: 'fleet-ships',
      builder: () =>
        new DataLoader((keys) =>
          getRepository(Fleet)
            .findByIds(keys as number[], {
              relations: [ 'ships' ],
            })
            .then((fleets) => fleets.map((f) => f.ships))),
    }),

  owner: () =>
    loadOrCreate<number, User>({
      loaderStore,
      key: 'fleet-owner',
      builder: () =>
        new DataLoader((keys) =>
          getRepository(Fleet)
            .findByIds(keys as number[], {
              relations: [ 'owner' ],
            })
            .then((fleets) => fleets.map((f) => f.owner))),
    }),

  seaSection: () =>
    loadOrCreate<number, SeaSection | null>({
      loaderStore,
      key: 'fleet-sea-section',
      builder: () =>
        new DataLoader((keys) =>
          getRepository(Fleet)
            .findByIds(keys as number[], {
              relations: [ 'seaSection' ],
            })
            .then((fleets) => fleets.map((f) => f.seaSection))),
    }),

  anchoredCity: () =>
    loadOrCreate<number, City | null>({
      loaderStore,
      key: 'fleet-anchored-city',
      builder: () =>
        new DataLoader((keys) =>
          getRepository(Fleet)
            .findByIds(keys as number[], {
              relations: [ 'anchoredCity' ],
            })
            .then((fleets) => fleets.map((f) => f.anchoredCity))),
    }),
});
