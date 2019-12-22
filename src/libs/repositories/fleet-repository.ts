import { Repository } from 'typeorm';
import { Fleet } from '../entities';

export class FleetRepository extends Repository<Fleet> {

  public async queryMovingFleets() {
    // TODO: query moving (= direction is not null) fleets
    return [];
  }
}
