import { Resolver, Arg, Query, FieldResolver, Root } from 'type-graphql';
import { User, Fleet, Champion } from '../../libs/entities';
import { getRepository } from 'typeorm';

@Resolver(Champion)
export class ChampionResolver {

  @Query((type) => [ Champion ])
  public async champion(@Arg('no') no: number) {
    const champion = await getRepository(Champion).findOne(no);
    return champion;
  }
}
