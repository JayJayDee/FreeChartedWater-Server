import { AbstractRepository, EntityRepository, In, getRepository } from 'typeorm';
import { Ship, BaseShip } from '../entities';
import DataLoader from 'dataloader';

@EntityRepository(Ship)
export class ShipRepository extends AbstractRepository<Ship> {

  private baseShipLoader: DataLoader<number, BaseShip>;

  constructor() {
    super();

    this.baseShipLoader =
      new DataLoader((shipIds) =>
        new Promise((resolve, reject) =>
          getRepository(Ship).findByIds(shipIds as any[], { relations: [ 'base' ]})
            .then((ships) => resolve(ships.map((s) => s.base)))
            .catch(reject)));
  }

  public async getBase(shipId: number) {
    return this.baseShipLoader.load(shipId);
  }
}
