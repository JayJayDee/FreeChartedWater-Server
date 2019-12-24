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
}
