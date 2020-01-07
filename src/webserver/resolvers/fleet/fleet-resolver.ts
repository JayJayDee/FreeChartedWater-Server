import { Resolver, FieldResolver, Root, Mutation, Arg, Ctx, Query, Int } from 'type-graphql';
import { Context } from 'apollo-server-core';
import { getRepository, getCustomRepository } from 'typeorm';

import { Fleet, Ship, User, City, SeaSection } from '../../../libs/entities';
import { FleetMoveArgs } from './fleet-args';
import { FoundSection } from '../common';
import { Position } from '../../../libs/entities/common';
import { FleetRepository } from '../../../libs/repositories';
import { FCWContext } from '../../context';

@Resolver((of) => Fleet)
export class FleetResolver {

  private fleetRepo: FleetRepository;

  constructor() {
    this.fleetRepo = getCustomRepository(FleetRepository);
  }

  @Mutation((type) => Fleet)
  public async moveFleet(@Arg('data') data: FleetMoveArgs, @Ctx() ctx: Context) {
    const fleet = await getRepository(Fleet).findOne(data.fleetNo);
    if (!fleet) {
      throw new Error(`fleet not found: ${data.fleetNo}`);
    }

    const direction = new Position({
      x: data.position.x,
      y: data.position.y,
    });

    fleet.direction = direction;
    await getRepository(Fleet).save(fleet);
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
  public ships(@Ctx() ctx: FCWContext, @Root() root: Fleet) {
    return ctx.loaders.fleet.ships().load(root.no);
  }

  @FieldResolver((type) => User)
  public owner(@Ctx() ctx: FCWContext, @Root() root: Fleet) {
    return ctx.loaders.fleet.owner().load(root.no);
  }

  @FieldResolver((type) => SeaSection, { nullable: true })
  public seaSection(@Ctx() ctx: FCWContext, @Root() root: Fleet) {
    return ctx.loaders.fleet.seaSection().load(root.no);
  }

  @FieldResolver((type) => City)
  public anchoredCity(@Ctx() ctx: FCWContext, @Root() root: Fleet) {
    return ctx.loaders.fleet.anchoredCity().load(root.no);
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
