import { loadOrCreate } from "./util";
import { Fleet, User, Ship, Champion, Item } from '../../libs/entities';
import DataLoader from 'dataloader';
import { getRepository } from "typeorm";

export const userLoader = ({ loaderStore }: {
  loaderStore: {[key: string]: any},
}) => ({

  fleets: () =>
    loadOrCreate<number, Fleet[]>({
      loaderStore,
      key: 'user-fleets',
      builder: () =>
        new DataLoader((userIds) =>
          getRepository(User).findByIds(userIds as number[], {
            relations: [ 'fleets' ],
          })
          .then((users) => users.map((u) => u.fleets))),
    }),

  ships: () =>
    loadOrCreate<number, Ship[]>({
      loaderStore,
      key: 'user-ships',
      builder: () =>
        new DataLoader((userIds) =>
          getRepository(User).findByIds(userIds as number[], {
            relations: [ 'ships' ],
          })
          .then((users) => users.map((u) => u.ships))),
    }),

  champions: () =>
    loadOrCreate<number, Champion[]>({
      loaderStore,
      key: 'user-champions',
      builder: () =>
        new DataLoader((userIds) =>
          getRepository(User).findByIds(userIds as number[], {
            relations: [ 'champions' ],
          })
          .then((users) => users.map((u) => u.champions))),
    }),

  items: () =>
    loadOrCreate<number, Item[]>({
      loaderStore,
      key: 'user-ships',
      builder: () =>
        new DataLoader((userIds) =>
          getRepository(User).findByIds(userIds as number[], {
            relations: [ 'items' ],
          })
          .then((users) => users.map((u) => u.items))),
    }),
});
