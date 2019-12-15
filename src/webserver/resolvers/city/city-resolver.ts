import { Resolver, FieldResolver, Root, Mutation, Arg, Query, Int } from 'type-graphql';
import { getRepository } from 'typeorm';
import { City, Country, Product, Ship, Fleet, Champion } from '../../../libs/entities';
import { ProductPurchaseArgs } from './city-args';

@Resolver((of) => City)
export class CityResolver {

  @Mutation((type) => Ship)
  public async purchaseFromCity(@Arg('data') data: ProductPurchaseArgs) {
    // TODO: purchase transaction.
    const s = await getRepository(Ship).findOne(data.shipNo);
    return s;
  }

  @Query((type) => City)
  public async city(@Arg('no', (type) => Int) no: number) {
    return getRepository(City).findOne(no);
  }

  @FieldResolver((type) => Country)
  public async country(@Root() city: City) {
    const c = await getRepository(City).findOne({
      where: { no: city.no },
      relations: [ 'country' ],
    });

    if (!c) {
      return null;
    }
    return c.country;
  }

  @FieldResolver((type) => [ Product ])
  public async products(@Root() city: City) {
    const c = await getRepository(City).findOne({
      where: { no: city.no },
      relations: [ 'products' ],
    });

    if (!c) {
      return [];
    }
    return c.products;
  }

  @FieldResolver((type) => [ Fleet ])
  public async fleets(@Root() city: City) {
    const c = await getRepository(City).findOne({
      where: { no: city.no },
      relations: [ 'anchoredFleets' ],
    });

    if (!c) {
      return [];
    }
    return c.anchoredFleets;
  }

  @FieldResolver((type) => [ Champion ])
  public async champions(@Root() city: City) {
    const c = await getRepository(City).findOne({
      where: { no: city.no },
      relations: [ 'champions' ],
    });

    if (!c) {
      return [];
    }
    return c.champions;
  }
}
