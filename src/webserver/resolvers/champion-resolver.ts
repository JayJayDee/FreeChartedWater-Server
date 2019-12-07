import { Resolver, Arg, Query } from 'type-graphql';
import { Champion } from '../../libs/entities';
import { getRepository } from 'typeorm';

@Resolver(Champion)
export class ChampionResolver {

  @Query((type) => Champion)
  public async champion(@Arg('no') no: number) {
    const champion =
      await getRepository(Champion).findOne(no, {
        relations: [ 'spawn', 'owner', 'base' ],
      });
    return champion;
  }
}
