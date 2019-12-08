import { Resolver, FieldResolver, Root } from 'type-graphql';
import { Fleet, Ship, User } from '../../libs/entities';
import { getRepository } from 'typeorm';

@Resolver((of) => Fleet)
export class FleetResolver {

  @FieldResolver((type) => [ Ship ])
  public async ships(@Root() fleet: Fleet) {
    const f = await getRepository(Fleet).findOne({
      where: { no: fleet.no },
      relations: [ 'ships' ],
    });

    if (!f) {
      return [];
    }
    return f.ships;
  }

  @FieldResolver((type) => User)
  public async owner(@Root() fleet: Fleet) {
    const f = await getRepository(Fleet).findOne({
      where: { no: fleet.no },
      relations: [ 'owner' ],
    });

    if (!f) {
      return [];
    }
    return f.owner;
  }
}
