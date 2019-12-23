import { ObjectType, Field, Int } from 'type-graphql';
import { Column } from 'typeorm';
import { Rect } from './rect';

@ObjectType()
export class Position {

  @Field((type) => Int)
  @Column({ nullable: true })
  public x: number;

  @Field((type) => Int)
  @Column({ nullable: true })
  public y: number;

  constructor(param?: { x?: number, y?: number }) {
    if (param) {
      if (param.x !== undefined && param.y !== undefined) {
        this.x = param.x;
        this.y = param.y;
      }
    }
  }

  public getBoundingRect(radius: number) {
    const topLeft = new Position({ x: this.x - radius, y: this.y - radius });
    const botRight = new Position({ x: this.x + radius, y: this.y + radius });
    const rect = new Rect({ topLeft, botRight });
    return rect;
  }
}
