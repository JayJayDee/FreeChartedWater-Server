import { Repository, LessThanOrEqual, MoreThan, MoreThanOrEqual } from 'typeorm';
import { SeaSection } from '../entities';

export class SeaSectionRepository extends Repository<SeaSection> {

  public async findByPosition(position: { x: number, y: number }) {
    const seaSection = this.findOne({
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
