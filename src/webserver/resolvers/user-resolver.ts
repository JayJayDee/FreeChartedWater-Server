import { Resolver, Arg, Query, FieldResolver, Root, Ctx } from 'type-graphql';
import { User, Fleet, Ship, Champion, Item } from '../../libs/entities';
import { getRepository } from 'typeorm';
import { FCWContext } from '../context';

@Resolver((of) => User)
export class UserResolver {

  @Query((type) => User)
  public async user(@Ctx() ctx: FCWContext, @Arg('no') no: number) {
    const user = await getRepository(User).findOne(no);
    return user;
  }

  @FieldResolver()
  public async fleets(@Ctx() ctx: FCWContext, @Root() root: User) {
    return ctx.loaders.user.fleets().load(root.no);
  }

  @FieldResolver()
  public async ships(@Root() user: User): Promise<Ship[]> {
    return await getRepository(Ship).find({ owner: user });
  }

  @FieldResolver()
  public async champions(@Root() user: User) {
    return await getRepository(Champion).find({ where: { owner: user }});
  }

  @FieldResolver()
  public async items(@Root() user: User) {
    return await getRepository(Item).find({ where: { owner: user }});
  }
}
