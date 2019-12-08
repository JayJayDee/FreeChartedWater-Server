import { Resolver, FieldResolver, Root } from 'type-graphql';
import { Ship, BaseShip, Fleet, Product } from '../../libs/entities';
import { getRepository } from 'typeorm';

@Resolver((of) => BaseShip)
export class BaseShipResolver {

  @FieldResolver((type) => [ Ship ])
  public async ships(@Root() base: BaseShip) {
    const ships = await getRepository(Ship).find({
      where: {
        base,
      },
    });
    return ships;
  }
}

@Resolver((of) => Ship)
export class ShipResolver {

  @FieldResolver((type) => BaseShip)
  public async base(@Root() ship: Ship) {
    const s = await getRepository(Ship).findOne({
      where: { no: ship.no },
      relations: [ 'base' ],
    });

    if (!s) {
      return null;
    }
    return s.base;
  }

  @FieldResolver((type) => Fleet)
  public async fleet(@Root() ship: Ship) {
    const s = await getRepository(Ship).findOne({
      where: { no: ship.no },
      relations: [ 'fleet' ],
    });
    if (!s) {
      return null;
    }
    return s.fleet;
  }

  @FieldResolver((type) => [ Product ])
  public async products(@Root() ship: Ship) {
    const s = await getRepository(Ship).findOne({
      where: { no: ship.no },
      relations: [ 'products' ],
    });
    if (!s) {
      return null;
    }
    return s.products;
  }
}
