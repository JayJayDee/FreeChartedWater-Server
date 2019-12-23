import { AbstractRepository, EntityRepository, getRepository, In } from 'typeorm';
import { Fleet, Ship } from '../entities';

@EntityRepository()
export class FleetRepository extends AbstractRepository<Fleet> {

  public async queryMovingFleets() {
    // TODO: query moving (= direction is not null) fleets
    return [];
  }

  public async getShipsInFleets(fleetIds: number[]) {
    const ships = await getRepository(Ship).find({
      where: {
        fleet: {
          no: In(fleetIds),
        },
      },
    });
    return ships;
  }
}
