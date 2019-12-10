import { ObjectType, Field, Int } from 'type-graphql';
import { Position } from './position';

@ObjectType()
export class Rect {

  @Field((type) => Position)
  public topLeft: Position;

  @Field((type) => Position)
  public botRight: Position;

  public includes(pos: Position) {
    if (pos.x >= this.topLeft.x && pos.x <= this.botRight.x &&
        pos.y >= this.topLeft.y && pos.y <= this.botRight.y) {
      return true;
    }
    return false;
  }
}
