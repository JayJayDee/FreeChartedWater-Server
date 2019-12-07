import { Resolver, FieldResolver, Root } from 'type-graphql';
import { Ship, BaseShip } from '../../libs/entities';
import { getRepository } from 'typeorm';

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
}
