import { Resolver, FieldResolver, Root, Mutation, Arg, Ctx, Query, Int } from 'type-graphql';
import { Context } from 'apollo-server-core';
import { getRepository } from 'typeorm';

import { Fleet, Ship, User, City, SeaSection } from '../../../libs/entities';
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
    section.items = [];
    section.products = [];
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

  @FieldResolver((type) => SeaSection, { nullable: true })
  public async seaSection(@Root() fleet: Fleet) {
    const f = await getRepository(Fleet).findOne({
      where: { no: fleet.no },
      relations: [ 'seaSection' ],
    });

    if (!f) {
      return null;
    }
    return f.seaSection;
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

  @FieldResolver((type) => Int, { nullable: true })
  public async cruisingSpeed(@Root() root: Fleet) {
    // TODO: CALCULATE
    return 0;
  }

  @FieldResolver((type) => Boolean)
  public async canSail(@Root() root: Fleet) {
    // TODO: CALCULATE
    return false;
  }
}

const calculateAverageCruisingSpeed =
  (ships: Ship[]) =>
      ships.map((s) => s.cruisingSpeed)
      .filter((s) => s !== null)
      .reduce((prev, cur) => ((prev as number) + (cur as number)), 0) as number
    /
      ships.filter((s) => s).length;
