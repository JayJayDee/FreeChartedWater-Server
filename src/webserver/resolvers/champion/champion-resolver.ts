import { Resolver, Root, FieldResolver } from 'type-graphql';
import { Champion, BaseChampion, City, User, Enums } from '../../../libs/entities';
import { getRepository, getCustomRepository } from 'typeorm';
import { ChampionRepository } from '../../../libs/repositories/champion-repository';

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

  private championRepo: ChampionRepository;

  constructor() {
    this.championRepo = getCustomRepository(ChampionRepository);
  }

  @FieldResolver((type) => BaseChampion)
  public base(@Root() champion: Champion) {
    return this.championRepo.getBaseInChampion(champion.no);
  }

  @FieldResolver((type) => City)
  public spawn(@Root() champion: Champion) {
    return this.championRepo.getSpawnInChampion(champion.no);
  }

  @FieldResolver((type) => User)
  public owner(@Root() champion: Champion) {
    return this.championRepo.getOwnerInChampion(champion.no);
  }

  @FieldResolver((type) => Enums.ChampionStatusEnum)
  public async status(@Root() root: Champion): Promise<'SPAWNED' | 'OWNED'> {
    const spawn = await this.championRepo.getSpawnInChampion(root.no);
    const owner = await this.championRepo.getOwnerInChampion(root.no);

    if (spawn && !owner) {
      return 'SPAWNED';
    }
    return 'OWNED';
  }
}
