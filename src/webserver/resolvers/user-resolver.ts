import { Resolver, Arg, Query, FieldResolver, Root } from 'type-graphql';
import { User, Fleet } from '../../libs/entities';
import { getRepository } from 'typeorm';

@Resolver(User)
export class UserResolver {

  @Query((type) => User)
  public async user(@Arg('no') no: number) {
    const user = await getRepository(User).findOne(no);
    return user;
  }

  @FieldResolver()
  public async fleets(@Root() user: User): Promise<Fleet[]> {
    if (user.fleets) return user.fleets;
    return await getRepository(Fleet).find({
      owner: user
    });
  }
}
