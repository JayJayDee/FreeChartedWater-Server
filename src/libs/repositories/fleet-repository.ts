import { AbstractRepository, EntityRepository, getRepository } from 'typeorm';
import { Fleet } from '../entities';

@EntityRepository()
export class FleetRepository extends AbstractRepository<Fleet> {

  public async queryMovingFleets() {
    // TODO: query moving (= direction is not null) fleets
    return [];
  }
}
