import { AbstractRepository, EntityRepository, In, getRepository } from 'typeorm';
import { Ship, BaseShip } from '../entities';
import DataLoader from 'dataloader';

@EntityRepository(Ship)
export class ShipRepository extends AbstractRepository<Ship> {

  private baseShipLoader: DataLoader<number, BaseShip> =
    new DataLoader((shipIds) =>
      getRepository(Ship)
        .findByIds(shipIds as number[], {
          relations: [ 'base' ],
        })
        .then((ships) => ships.map((s) => s.base)));

  public async getBase(shipId: number) {
    return this.baseShipLoader.load(shipId);
  }
}
