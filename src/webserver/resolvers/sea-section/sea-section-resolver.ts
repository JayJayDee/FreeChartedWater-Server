import { Resolver, FieldResolver, Root } from 'type-graphql';
import { SeaSection, Fleet, Ocean } from '../../../libs/entities';
import { Rect } from '../../../libs/entities/common';
import { getRepository, getCustomRepository } from 'typeorm';
import { SeaSectionRepository } from '../../../libs/repositories';

@Resolver((type) => SeaSection)
export class SeaSectionResolver {

  private seaSectionRepo: SeaSectionRepository;

  constructor() {
    this.seaSectionRepo = getCustomRepository(SeaSectionRepository);
  }

  @FieldResolver((type) => Rect)
  public async region(@Root() root: SeaSection) {
    return new Rect({
      topLeft: root.positionTopLeft,
      botRight: root.positionBotRight,
    });
  }

  @FieldResolver((type) => [ Fleet ])
  public async fleets(@Root() root: SeaSection) {
    return this.seaSectionRepo.getFleetsInSeaSection(root.no);
  }

  @FieldResolver((type) => Ocean)
  public async ocean(@Root() root: SeaSection) {
    const seaSection = await getRepository(SeaSection).findOne({
      where: {
        no: root.no,
      },
      relations: [ 'ocean' ],
    });
    if (!seaSection) {
      return null;
    }
    return seaSection.ocean;
  }
}
