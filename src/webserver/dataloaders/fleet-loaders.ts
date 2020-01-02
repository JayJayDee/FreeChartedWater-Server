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

  seaSectionsInFleets:
    new DataLoader((keys) =>
      getCustomRepository(FleetRepository)
        .getSeaSectionsInFleets(keys as number[]),
      { cache: false }),

  anchoredCitiesInFleets:
    new DataLoader((keys) =>
      getCustomRepository(FleetRepository)
        .getAnchoredCitiesInFlets(keys as number[]),
      { cache: false }),
};
