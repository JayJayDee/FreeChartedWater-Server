import { Resolver, FieldResolver, Root } from 'type-graphql';
import { SeaSection, Fleet, Ocean } from '../../../libs/entities';
import { Rect, Position } from '../../../libs/entities/common';
import { getRepository } from 'typeorm';

@Resolver((type) => SeaSection)
export class SeaSectionResolver {

  @FieldResolver((type) => Rect)
  public async region(@Root() root: SeaSection) {
    const region = new Rect();

    const topLeft = new Position();
    topLeft.x = root.posTLX;
    topLeft.y = root.posTLY;

    const botRight = new Position();
    botRight.x = root.posBRX;
    botRight.y = root.posBRY;

    region.topLeft = topLeft;
    region.botRight = botRight;
    return region;
  }

  @FieldResolver((type) => [ Fleet ])
  public async fleets(@Root() root: SeaSection) {
    return getRepository(Fleet).find({
      where: {
        seaSection: {
          no: root.no,
        },
      },
    });
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
