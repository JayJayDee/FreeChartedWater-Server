import { Resolver, FieldResolver, Root, Mutation, Arg, Query, Int } from 'type-graphql';
import { getRepository, getConnection, getCustomRepository } from 'typeorm';
import { City, Country, Product, Ship, Fleet, Champion, User } from '../../../libs/entities';
import { NotFoundError, NotEnoughGoldError, InvalidProductStateError } from '../../errors';

import { ProductPurchaseArgs } from './city-args';
import { CityRepository } from '../../../libs/repositories';

@Resolver((of) => City)
export class CityResolver {

  private cityRepo: CityRepository;

  constructor() {
    this.cityRepo = getCustomRepository(CityRepository);
  }

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
  public country(@Root() city: City) {
    return this.cityRepo.getCountryOfCity(city.no);
  }

  @FieldResolver((type) => [ Product ])
  public products(@Root() city: City) {
    return this.cityRepo.getProductsInCity(city.no);
  }

  @FieldResolver((type) => [ Fleet ])
  public fleets(@Root() city: City) {
    return this.cityRepo.getAnchoredFleetsInCity(city.no);
  }

  @FieldResolver((type) => [ Champion ])
  public champions(@Root() city: City) {
    return this.cityRepo.getChampionsInCity(city.no);
  }
}
