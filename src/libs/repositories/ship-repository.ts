import { AbstractRepository, EntityRepository, In, getRepository } from 'typeorm';
import DataLoader from 'dataloader';
import { Ship, BaseShip, Fleet, Product } from '../entities';

const cache = false;

@EntityRepository(Ship)
export class ShipRepository extends AbstractRepository<Ship> {

  private baseShipLoader: DataLoader<number, BaseShip> =
    new DataLoader((shipIds) =>
      getRepository(Ship)
        .findByIds(shipIds as number[], {
          relations: [ 'base' ],
        })
        .then((ships) => ships.map((s) => s.base)), { cache });

  private fleetLoader: DataLoader<number, Fleet> =
    new DataLoader((shipIds) =>
      getRepository(Ship)
        .findByIds(shipIds as number[], {
          relations: [ 'fleet' ],
        })
        .then((ships) => ships.map((s) => s.fleet)), { cache });

  private productsLoader: DataLoader<number, Product[]> =
    new DataLoader((shipIds) =>
      getRepository(Ship)
        .findByIds(shipIds as number[], {
          relations: [ 'products' ],
        })
        .then((ships) => ships.map((s) => s.products)), { cache });

  public getBase(shipId: number) {
    return this.baseShipLoader.load(shipId);
  }

  public getFleet(shipId: number) {
    return this.fleetLoader.load(shipId);
  }

  public getProducts(shipId: number) {
    return this.productsLoader.load(shipId);
  }
}
