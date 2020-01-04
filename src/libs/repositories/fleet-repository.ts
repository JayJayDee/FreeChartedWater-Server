import { AbstractRepository, EntityRepository, getRepository, In } from 'typeorm';
import { Fleet, Ship, User, SeaSection, City } from '../entities';
import DataLoader from 'dataloader';

const cache = false;

@EntityRepository()
export class FleetRepository extends AbstractRepository<Fleet> {

  private shipsLoader: DataLoader<number, Ship[]> =
    new DataLoader((fleetIds) =>
      getRepository(Fleet).find({
        where: {
          no: In(fleetIds as number[]),
        },
        relations: [ 'ships' ],
      })
      .then((fleets) => fleets.map((f) => f.ships)), { cache });

  private ownerLoader: DataLoader<number, User> =
    new DataLoader((fleetIds) =>
      getRepository(Fleet)
        .findByIds(fleetIds as number[], {
          relations: [ 'owner' ],
        })
        .then((fleets) => fleets.map((f) => f.owner)), { cache });

  private seaSectionLoader: DataLoader<number, SeaSection | null> =
    new DataLoader((fleetIds) =>
      getRepository(Fleet)
        .findByIds(fleetIds as number[], {
          relations: [ 'seaSection' ],
        })
        .then((fleets) => fleets.map((f) => f.seaSection)), { cache });

  private anchoredCityLoader: DataLoader<number, City | null> =
    new DataLoader((fleetIds) =>
      getRepository(Fleet)
        .findByIds(fleetIds as number[], {
          relations: [ 'anchoredCity' ],
        })
        .then((fleets) => fleets.map((f) => f.anchoredCity)), { cache });

  public async queryMovingFleets() {
    // TODO: query moving (= direction is not null) fleets
    return [];
  }

  public getShipsInFleet(fleetId: number) {
    return this.shipsLoader.load(fleetId);
  }

  public getOwnerInFleet(fleetId: number) {
    return this.ownerLoader.load(fleetId);
  }

  public getSeaSectionInFleet(fleetId: number) {
    return this.seaSectionLoader.load(fleetId);
  }

  public getAnchoredCityInFleet(fleetId: number) {
    return this.anchoredCityLoader.load(fleetId);
  }
}
