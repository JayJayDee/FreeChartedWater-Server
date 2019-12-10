import { Resolver, FieldResolver, Root } from 'type-graphql';
import { City, Country } from '../../../libs/entities';
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
