import { Resolver, Root, FieldResolver, Int } from 'type-graphql';
import { getRepository, getCustomRepository } from 'typeorm';
import { Champion, BaseChampion, City, User, Enums, AbilityPoints } from '../../../libs/entities';
import { ChampionRepository } from '../../../libs/repositories';

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

  @FieldResolver((type) => AbilityPoints)
  public async abilityPoints(@Root() root: Champion): Promise<AbilityPoints> {
    const pts = new AbilityPoints();
    pts.battle = 0;
    pts.health = 0;
    pts.leadership = 0;
    pts.navigation = 0;
    pts.trading = 0;
    return pts;
  }

  @FieldResolver((type) => Int)
  public async expMax(@Root() root: Champion): Promise<number> {
    return 0;
  }
}
