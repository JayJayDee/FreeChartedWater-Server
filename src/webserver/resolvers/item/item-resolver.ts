import { Resolver, FieldResolver, Root } from 'type-graphql';
import { BaseItem, Item, Champion } from '../../../libs/entities';
import { getRepository } from 'typeorm';

@Resolver((of) => BaseItem)
export class BaseItemResolver {

  @FieldResolver((type) => [ Item ])
  public async ships(@Root() base: BaseItem) {
    const items = await getRepository(Item).find({
      where: {
        base,
      },
    });
    return items;
  }
}

@Resolver((of) => Item)
export class ItemResolver {

  @FieldResolver((type) => BaseItem)
  public async base(@Root() item: Item) {
    const i = await getRepository(Item).findOne({
      where: { no: item.no },
      relations: [ 'base' ],
    });
    if (!i) {
      return null;
    }
    return i.base;
  }

  @FieldResolver((type) => Champion)
  public async ownedChampion(@Root() item: Item) {
    const i = await getRepository(Item).findOne({
      where: { no: item.no },
      relations: [ 'ownedChampion' ],
    });
    if (!i) {
      return null;
    }
    return i.ownedChampion;
  }
}
