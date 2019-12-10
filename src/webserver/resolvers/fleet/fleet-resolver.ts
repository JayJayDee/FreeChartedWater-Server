import { Resolver, FieldResolver, Root, Mutation, Arg, Ctx } from 'type-graphql';
import { getRepository } from 'typeorm';

import { Fleet, Ship, User, City } from '../../../libs/entities';
import { FleetMoveArgs } from './fleet-args';
import { Context } from 'apollo-server-core';

@Resolver((of) => Fleet)
export class FleetResolver {

  @Mutation((type) => Fleet)
  public async move(@Arg('data') data: FleetMoveArgs, @Ctx() ctx: Context) {
    const fleet = await getRepository(Fleet).findOne(data.fleetNo);
    return fleet;
  }

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

  @FieldResolver((type) => City)
  public async anchoredCity(@Root() fleet: Fleet) {
    const f = await getRepository(Fleet).findOne({
      where: { no: fleet.no },
      relations: [ 'anchoredCity' ],
    });

    if (!f) {
      return null;
    } else if (!f.anchoredCity) {
      return null;
    }
    return f.anchoredCity;
  }
}
