import { Resolver, Root, FieldResolver } from 'type-graphql';
import { Champion, BaseChampion, City, User } from '../../../libs/entities';
import { getRepository } from 'typeorm';

@Resolver((of) => BaseChampion)
export class BaseChampionResolver {

  @FieldResolver((type) => [ Champion ])
  public async champions(@Root() base: BaseChampion) {
    const champions = await getRepository(Champion).find({
      where: {
        base,
      },
    });
    return champions;
  }
}

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

  @FieldResolver((type) => City)
  public async spawn(@Root() champion: Champion) {
    const cham = await getRepository(Champion).findOne({
      where: { no: champion.no },
      relations: [ 'spawn' ],
    });
    if (!cham) {
      return null;
    }
    return cham.spawn;
  }

  @FieldResolver((type) => User)
  public async owner(@Root() champion: Champion) {
    const cham = await getRepository(Champion).findOne({
      where: { no: champion.no },
      relations: [ 'owner' ],
    });
    if (!cham) {
      return null;
    }
    return cham.owner;
  }
}