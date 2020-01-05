import { Resolver, FieldResolver, Root, Int } from 'type-graphql';
import { Ship, BaseShip, Fleet, Product } from '../../../libs/entities';
import { getRepository, getCustomRepository } from 'typeorm';
import { ShipRepository } from '../../../libs/repositories';

@Resolver((of) => Ship)
export class ShipResolver {

  private shipRepo: ShipRepository;

  constructor() {
    this.shipRepo = getCustomRepository(ShipRepository);
  }

  @FieldResolver((type) => BaseShip)
  public base(@Root() ship: Ship) {
    return this.shipRepo.getBase(ship.no);
  }

  @FieldResolver((type) => Fleet)
  public fleet(@Root() ship: Ship) {
    return this.shipRepo.getFleet(ship.no);
  }

  @FieldResolver((type) => [ Product ])
  public products(@Root() ship: Ship) {
    return this.shipRepo.getProducts(ship.no);
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
