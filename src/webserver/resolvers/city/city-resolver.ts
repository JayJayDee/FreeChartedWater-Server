import { Resolver, FieldResolver, Root, Mutation, Arg } from 'type-graphql';
import { getRepository } from 'typeorm';
import { City, Country, Product, Ship } from '../../../libs/entities';
import { ProductPurchaseArgs } from './city-args';

@Resolver((of) => City)
export class CityResolver {

  @Mutation((type) => Ship)
  public async purchaseFromCity(@Arg('data') data: ProductPurchaseArgs) {
    // TODO: purchase transaction.
    const s = await getRepository(Ship).findOne(data.shipNo);
    return s;
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
}
