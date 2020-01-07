import { loadOrCreate } from "./util";
import { Fleet, User } from '../../libs/entities';
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
});
