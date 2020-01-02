import { AbstractRepository, EntityRepository, getRepository, In } from 'typeorm';
import { Fleet } from '../entities';

@EntityRepository()
export class FleetRepository extends AbstractRepository<Fleet> {

  public async queryMovingFleets() {
    // TODO: query moving (= direction is not null) fleets
    return [];
  }

  public async getShipsInFleets(fleetIds: number[]) {
    const fleets = await getRepository(Fleet).find({
      where: {
        no: In(fleetIds),
      },
      relations: [ 'ships' ],
    });
    return fleets.map((f) => f.ships);
  }

  public async getOwnersInFleets(fleetIds: number[]) {
    const fleets =
      await getRepository(Fleet)
        .findByIds(fleetIds, {
          relations: [ 'owner' ],
        });
    return fleets.map((f) => f.owner);
  }

  public async getSeaSectionsInFleets(fleetIds: number[]) {
    const fleets =
      await getRepository(Fleet)
        .findByIds(fleetIds, {
          relations: [ 'seaSection' ],
        });
    return fleets.map((f) => f.seaSection);
  }

  public async getAnchoredCitiesInFlets(fleetIds: number[]) {
    const fleets =
      await getRepository(Fleet)
        .findByIds(fleetIds, {
          relations: [ 'anchoredCity' ],
        });
    return fleets.map((f) => f.anchoredCity);
  }
}
