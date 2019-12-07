import { Resolver, Root, FieldResolver } from 'type-graphql';
import { Champion, BaseChampion } from '../../libs/entities';
import { getRepository } from 'typeorm';

@Resolver((of) => Champion)
export class ChampionResolver {

  @FieldResolver((type) => BaseChampion)
  public async base(@Root() champion: Champion) {
    const cham =
      await getRepository(Champion).findOne({
        where: { no: champion.no },
        relations: [ 'base' ],
      });
    if (!cham) {
      return null;
    }
    return cham.base;
  }
}
