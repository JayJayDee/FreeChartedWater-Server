import { Resolver, FieldResolver, Root, Query, Arg, Int, Ctx } from 'type-graphql';
import { getRepository, getCustomRepository } from 'typeorm';
import { BaseItem, Item, Champion, User, Ship } from '../../../libs/entities';
import { ItemRepository } from '../../../libs/repositories';
import { FCWContext } from '../../context';

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
  public owner(@Ctx() ctx: FCWContext, @Root() item: Item) {
    return ctx.loaders.item.owner().load(item.no);
  }

  @FieldResolver((type) => Champion, { nullable: true })
  public ownedChampion(@Ctx() ctx: FCWContext, @Root() item: Item) {
    return ctx.loaders.item.ownedChampion().load(item.no);
  }

  @FieldResolver((type) => Ship, { nullable: true })
  public ownedShip(@Ctx() ctx: FCWContext, @Root() item: Item) {
    return ctx.loaders.item.ownedShip().load(item.no);
  }
}
