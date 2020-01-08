import DataLoader from 'dataloader';
import { getRepository } from 'typeorm';
import { Ship, User, Item, Champion, BaseItem } from '../../libs/entities';
import { loadOrCreate } from './util';

export const itemLoader = ({ loaderStore }: {
  loaderStore: {[key: string]: any},
}) => ({
  base: () =>
    loadOrCreate<number, BaseItem>({
      loaderStore,
      key: 'item-base',
      builder: () =>
        new DataLoader((keys) =>
          getRepository(Item)
            .findByIds(keys as number[], {
              relations: [ 'base' ],
            })
            .then((items) => items.map((i) => i.base))),
    }),

  owner: () =>
    loadOrCreate<number, User | null>({
      loaderStore,
      key: 'item-user',
      builder: () =>
        new DataLoader((keys) =>
          getRepository(Item)
            .findByIds(keys as number[], {
              relations: [ 'owner' ],
            })
            .then((fleets) => fleets.map((f) => f.owner))),
    }),

  ownedChampion: () =>
    loadOrCreate<number, Champion | null>({
      loaderStore,
      key: 'item-champion',
      builder: () =>
        new DataLoader((keys) =>
          getRepository(Item)
            .findByIds(keys as number[], {
              relations: [ 'ownedChampion' ],
            })
            .then((fleets) => fleets.map((f) => f.ownedChampion))),
    }),

  ownedShip: () =>
    loadOrCreate<number, Ship | null>({
      loaderStore,
      key: 'item-ship',
      builder: () =>
        new DataLoader((keys) =>
          getRepository(Item)
            .findByIds(keys as number[], {
              relations: [ 'ownedShip' ],
            })
            .then((fleets) => fleets.map((f) => f.ownedShip))),
    }),
});
