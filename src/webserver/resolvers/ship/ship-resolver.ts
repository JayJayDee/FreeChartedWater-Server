import { Resolver, FieldResolver, Root, Int } from 'type-graphql';
import { Ship, BaseShip, Fleet, Product } from '../../../libs/entities';
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

  @FieldResolver((type) => Int, { nullable: true })
  public async cruisingSpeed(@Root() ship: Ship) {
    // TODO: CALCULATE
    return 0;
  }

  @FieldResolver((type) => Int, { nullable: true })
  public async availableCruisingDay(@Root() ship: Ship) {
    // TODO: CALCULATE
    return 0;
  }
}

const calculateCruisingSpeed =
  ({ currentCrew, maxCrew, currentCapacity, maxCapacity }: {
    currentCrew: number, maxCrew: number, currentCapacity: number, maxCapacity: number,
  }) => {
    // TODO: calculate cruising speed.
    return 0;
  };

const calculateCruisingDay =
  ({ currentCrew, currentCapacity }: {
    currentCrew: number, currentCapacity: number,
  }) => {
    // TODO: calculate available cruising day.
    return 0;
  };
