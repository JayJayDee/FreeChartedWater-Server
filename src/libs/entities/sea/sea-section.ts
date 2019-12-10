import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, OneToMany, AfterLoad } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { Ocean } from './ocean';
import { Fleet } from '../fleet';
import { Rect, Position } from '../common';

@Entity()
@ObjectType()
export class SeaSection {

  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  public no: number;

  @Column()
  public posTLX: number;

  @Column()
  public posTLY: number;

  @Column()
  public posBRX: number;

  @Column()
  public posBRY: number;

  @Field((type) => Rect)
  public region: Rect;

  @ManyToOne((type) => Ocean)
  @Field((type) => Ocean)
  public ocean: Ocean;

  @OneToMany((type) => Fleet, (fleet) => fleet.seaSection)
  @Field((type) => [ Fleet ])
  public fleets: Fleet[];

  @AfterLoad()
  private afterLoad() {
    const topLeft = new Position();
    topLeft.x = this.posTLX;
    topLeft.y = this.posTLY;

    const botRight = new Position();
    botRight.x = this.posBRX;
    botRight.y = this.posBRY;

    const rect = new Rect();
    rect.topLeft = topLeft;
    rect.botRight = botRight;
  }
}
