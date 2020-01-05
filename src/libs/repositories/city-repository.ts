import { EntityRepository, AbstractRepository, getRepository } from 'typeorm';
import DataLoader from 'dataloader';
import { City, Country, Fleet, Champion, Product } from '../entities';

const cache = false;

@EntityRepository()
export class CityRepository extends AbstractRepository<City> {

  private countryLoader: DataLoader<number, Country> =
    new DataLoader((cityIds) =>
      getRepository(City)
        .findByIds(cityIds as number[], {
          relations: [ 'country' ],
        })
        .then((cities) => cities.map((c)  => c.country)), { cache });

  private fleetsLoader: DataLoader<number, Fleet[]> =
    new DataLoader((cityIds) =>
      getRepository(City)
        .findByIds(cityIds as number[], {
          relations: [ 'anchoredFleets' ],
        })
        .then((cities) => cities.map((c)  => c.anchoredFleets)), { cache });

  private championsLoader: DataLoader<number, Champion[]> =
    new DataLoader((cityIds) =>
      getRepository(City)
        .findByIds(cityIds as number[], {
          relations: [ 'champions' ],
        })
        .then((cities) => cities.map((c)  => c.champions)), { cache });

  private productsLoader: DataLoader<number, Product[]> =
    new DataLoader((cityIds) =>
      getRepository(City)
        .findByIds(cityIds as number[], {
          relations: [ 'products' ],
        })
        .then((cities) => cities.map((c)  => c.products)), { cache });

  public getCountryOfCity(cityNo: number) {
    return this.countryLoader.load(cityNo);
  }

  public getAnchoredFleetsInCity(cityNo: number) {
    return this.fleetsLoader.load(cityNo);
  }

  public getChampionsInCity(cityNo: number) {
    return this.championsLoader.load(cityNo);
  }

  public getProductsInCity(cityNo: number) {
    return this.productsLoader.load(cityNo);
  }
}
