import { Resolver, FieldResolver, Root } from 'type-graphql';
import { City, Country, Product } from '../../../libs/entities';
import { getRepository } from 'typeorm';

@Resolver((of) => Country)
export class CountryResolver {

  @FieldResolver((type) => [ City ])
  public async ships(@Root() country: Country) {
    const c = await getRepository(Country).findOne({
      where: { no: country.no },
      relations: [ 'cities' ],
    });

    if (!c) {
      return [];
    }
    return c.cities;
  }
}

@Resolver((of) => City)
export class CityResolver {

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
