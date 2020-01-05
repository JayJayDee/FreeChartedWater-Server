import { Resolver, FieldResolver, Root, Query, Arg, Int } from 'type-graphql';
import { getRepository, getCustomRepository } from 'typeorm';
import { BaseItem, Item, Champion, User, Ship } from '../../../libs/entities';
import { ItemRepository } from '../../../libs/repositories';

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

  private itemRepo: ItemRepository;

  constructor() {
    this.itemRepo = getCustomRepository(ItemRepository);
  }

  @Query((type) => Item)
  public async item(@Arg('id', (type) => Int) id: number) {
    return getRepository(Item).findOne(id);
  }

  @FieldResolver((type) => BaseItem)
  public async base(@Root() item: Item) {
    return this.itemRepo.getBaseInItem(item.no);
  }

  @FieldResolver((type) => User, { nullable: true })
  public async owner(@Root() item: Item) {
    return this.itemRepo.getOwnerOfItem(item.no);
  }

  @FieldResolver((type) => Champion, { nullable: true })
  public ownedChampion(@Root() item: Item) {
    return this.itemRepo.getOwnedChampionOfItem(item.no);
  }

  @FieldResolver((type) => Ship, { nullable: true })
  public ownedShip(@Root() item: Item) {
    return this.itemRepo.getOwnedShipOfItem(item.no);
  }
}
