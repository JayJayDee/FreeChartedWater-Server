import { Resolver, Arg, Query, FieldResolver, Root } from 'type-graphql';
import { User, Fleet, Ship, Champion } from '../../libs/entities';
import { getRepository } from 'typeorm';

@Resolver((of) => User)
export class UserResolver {

  @Query((type) => User)
  public async user(@Arg('no') no: number) {
    const user = await getRepository(User).findOne(no);
    return user;
  }

  @FieldResolver()
  public async fleets(@Root() user: User): Promise<Fleet[]> {
    return await getRepository(Fleet).find({ owner: user });
  }

  @FieldResolver()
  public async ships(@Root() user: User): Promise<Ship[]> {
    return await getRepository(Ship).find({ owner: user });
  }

  @FieldResolver()
  public async champions(@Root() user: User) {
    return await getRepository(Champion).find({ where: { owner: user }});
  }
}
