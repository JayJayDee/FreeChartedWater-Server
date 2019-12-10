import { Resolver, FieldResolver, Root } from 'type-graphql';
import { Ship, BaseShip } from '../../../libs/entities';
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
