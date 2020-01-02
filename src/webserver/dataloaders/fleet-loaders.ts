import { getCustomRepository } from 'typeorm';
import { FleetRepository } from '../../libs/repositories';
import DataLoader from 'dataloader';

export const fleetLoader = {
  shipsInFleets:
    new DataLoader((keys) =>
      getCustomRepository(FleetRepository)
        .getShipsInFleets(keys as number[]),
      { cache: false }),

  ownerInFleets:
    new DataLoader((keys) =>
      getCustomRepository(FleetRepository)
        .getOwnersInFleets(keys as number[]),
      { cache: false }),
};
