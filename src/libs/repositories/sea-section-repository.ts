import { LessThanOrEqual, MoreThanOrEqual, getRepository, EntityRepository, AbstractRepository } from 'typeorm';
import { SeaSection, Fleet } from '../entities';
import DataLoader from 'dataloader';

const cache = false;

@EntityRepository()
export class SeaSectionRepository extends AbstractRepository<SeaSection> {

  private fleetsLoader: DataLoader<number, Fleet[]> =
    new DataLoader((seaSectionIds) =>
      getRepository(SeaSection)
        .findByIds(seaSectionIds as number[], {
          relations: [ 'fleets' ],
        })
        .then((seaSections) => seaSections.map((s) => s.fleets)), { cache });

  public getFleetsInSeaSection(seaSectionNo: number) {
    return this.fleetsLoader.load(seaSectionNo);
  }

  public async findByPosition(position: { x: number, y: number }) {
    const seaSection = getRepository(SeaSection).findOne({
      where: {
        positionTopLeft: {
          x: LessThanOrEqual(position.x),
          y: LessThanOrEqual(position.y),
        },
        positionBotRight: {
          x: MoreThanOrEqual(position.x),
          y: MoreThanOrEqual(position.y),
        },
      },
    });

    if (!seaSection) {
      return null;
    }
    return seaSection;
  }
}
