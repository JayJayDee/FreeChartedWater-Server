import { Resolver, FieldResolver, Root, Mutation, Arg, Ctx, Query } from 'type-graphql';
import { Context } from 'apollo-server-core';
import { getRepository } from 'typeorm';

import { Fleet, Ship, User, City } from '../../../libs/entities';
import { FleetMoveArgs } from './fleet-args';
import { FoundSection } from '../common';

@Resolver((of) => Fleet)
export class FleetResolver {

  @Mutation((type) => Fleet)
  public async move(@Arg('data') data: FleetMoveArgs, @Ctx() ctx: Context) {
    const fleet = await getRepository(Fleet).findOne(data.fleetNo);
    return fleet;
  }

  @Query((type) => FoundSection)
  public async find(@Arg('fleetNo') fleetNo: number) {
    const fleet = await getRepository(Fleet).findOne(fleetNo);

    if (!fleet) {
      throw new Error(`fleet not found: ${fleetNo}`);
    }

    const findingRegion = fleet.position.getBoundingRect(100);
    console.log(findingRegion);
    // TODO: find cities with region

    const section = new FoundSection();
    section.cities = [];
    return section;
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
