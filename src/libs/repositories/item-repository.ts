import { AbstractRepository, EntityRepository, getRepository } from 'typeorm';
import { Item, BaseItem, User, Champion, Ship } from '../entities';
import DataLoader = require('dataloader');

const cache = false;

@EntityRepository(Item)
export class ItemRepository extends AbstractRepository<Item> {

  private baseLoader: DataLoader<number, BaseItem> =
    new DataLoader((itemIds) =>
      getRepository(Item)
        .findByIds(itemIds as number[], {
          relations: [ 'base' ],
        })
        .then((items) => items.map((i) => i.base)), { cache });

  private ownerLoader: DataLoader<number, User | null> =
    new DataLoader((itemIds) =>
      getRepository(Item)
        .findByIds(itemIds as number[], {
          relations: [ 'owner' ],
        })
        .then((items) => items.map((i) => i.owner)), { cache });

  private ownedChampionLoader: DataLoader<number, Champion | null> =
    new DataLoader((itemIds) =>
      getRepository(Item)
        .findByIds(itemIds as number[], {
          relations: [ 'ownedChampion' ],
        })
        .then((items) => items.map((i) => i.ownedChampion)), { cache });

  private ownedShipLoader: DataLoader<number, Ship | null> =
    new DataLoader((itemIds) =>
      getRepository(Item)
        .findByIds(itemIds as number[], {
          relations: [ 'ownedShip' ],
        })
        .then((items) => items.map((i) => i.ownedShip)), { cache });

  public getBaseInItem(itemNo: number) {
    return this.baseLoader.load(itemNo);
  }

  public getOwnerOfItem(itemNo: number) {
    return this.ownerLoader.load(itemNo);
  }

  public getOwnedChampionOfItem(itemNo: number) {
    return this.ownedChampionLoader.load(itemNo);
  }

  public getOwnedShipOfItem(itemNo: number) {
    return this.ownedShipLoader.load(itemNo);
  }
}
