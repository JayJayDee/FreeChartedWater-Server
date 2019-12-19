import { Resolver, FieldResolver, Root, Mutation, Arg, Query, Int } from 'type-graphql';
import { getRepository, getConnection, Not } from 'typeorm';
import { City, Country, Product, Ship, Fleet, Champion, User } from '../../../libs/entities';
import { NotFoundError, NotEnoughGoldError, InvalidProductStateError } from '../../errors';

import { ProductPurchaseArgs } from './city-args';

@Resolver((of) => City)
export class CityResolver {

  @Mutation((type) => Ship)
  public async purchaseFromCity(@Arg('data') data: ProductPurchaseArgs) {

    // purchase transaction.
    await getConnection().transaction(async (mgr) => {
      const user = await getRepository(User).findOne(data.userNo);
      if (!user) {
        throw new NotFoundError({ clazz: User, id: data.userNo });
      }

      const product = await getRepository(Product).findOne(data.productNo);
      if (!product) {
        throw new NotFoundError({ clazz: Product, id: data.productNo });
      }

      const ship = await getRepository(Ship).findOne(data.shipNo);
      if (!ship) {
        throw new NotFoundError({ clazz: Ship, id: data.shipNo });
      }

      if (product.producedBy === null || product.loadedBy !== null) {
        throw new InvalidProductStateError({ productNo: product.no });
      }

      product.producedBy = null;
      product.loadedBy = ship;

      user.gold = user.gold - product.price;
      if (user.gold < 0) {
        throw new NotEnoughGoldError({ userId: data.userNo });
      }

      await getRepository(Product).save(product);
      await getRepository(User).save(user);
    });

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
