import { EntityRepository, AbstractRepository, getRepository } from 'typeorm';
import { Champion, BaseChampion, User, City, Item } from '../entities';
import DataLoader from 'dataloader';

const cache = false;

@EntityRepository()
export class ChampionRepository extends AbstractRepository<Champion> {

  private baseChampionLoader: DataLoader<number, BaseChampion> =
    new DataLoader((championIds) =>
      getRepository(Champion)
        .findByIds(championIds as number[], {
          relations: [ 'base' ],
        })
        .then((champions) => champions.map((c) => c.base)), { cache });

  private ownerLoader: DataLoader<number, User | null> =
    new DataLoader((championIds) =>
      getRepository(Champion)
        .findByIds(championIds as number[], {
          relations: [ 'owner' ],
        })
        .then((champions) => champions.map((c) => c.owner)), { cache });

  private spawnLoader: DataLoader<number, City | null> =
    new DataLoader((championIds) =>
    getRepository(Champion)
      .findByIds(championIds as number[], {
        relations: [ 'spawn' ],
      })
      .then((champions) => champions.map((c) => c.spawn)), { cache });

  private itemsLoader: DataLoader<number, Item[]> =
    new DataLoader((championIds) =>
      getRepository(Champion)
        .findByIds(championIds as number[], {
          relations: [ 'equippedItems' ],
        })
        .then((champions) => champions.map((c) => c.equippedItems)));

  public getBaseInChampion(championNo: number) {
    return this.baseChampionLoader.load(championNo);
  }

  public getOwnerInChampion(championNo: number) {
    return this.ownerLoader.load(championNo);
  }

  public getSpawnInChampion(championNo: number) {
    return this.spawnLoader.load(championNo);
  }

  public getEquippedItemsInChampion(championNo: number) {
    return this.itemsLoader.load(championNo);
  }
}
