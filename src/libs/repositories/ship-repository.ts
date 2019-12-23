import { AbstractRepository, EntityRepository, In } from 'typeorm';
import { Ship } from '../entities';
import DataLoader from 'dataloader';

@EntityRepository(Ship)
export class ShipRepository extends AbstractRepository<Ship> {

  private shipLoader: DataLoader<number, Ship>;

  constructor() {
    super();
    this.shipLoader = new DataLoader((keys) =>
      this.repository.find({
        where: {
          fleet: {
            no: In(keys as number[]),
          },
        },
      }));
  }

  public async getShipsByFleetNos(fleetNos: number[]) {
    return this.shipLoader.loadMany(fleetNos);
  }
}
