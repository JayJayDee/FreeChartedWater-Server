import { ObjectType, Field } from 'type-graphql';
import { Position } from './position';

@ObjectType()
export class Rect {

  @Field((type) => Position)
  public topLeft: Position;

  @Field((type) => Position)
  public botRight: Position;

  constructor(param?: { topLeft?: Position, botRight?: Position }) {
    if (param) {
      if (param.topLeft !== undefined && param.botRight !== undefined) {
        this.topLeft = param.topLeft;
        this.botRight = param.botRight;
      }
    }
  }

  public includes(pos: Position) {
    if (pos.x >= this.topLeft.x && pos.x <= this.botRight.x &&
        pos.y >= this.topLeft.y && pos.y <= this.botRight.y) {
      return true;
    }
    return false;
  }
}
