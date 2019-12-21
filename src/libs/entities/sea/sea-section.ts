import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, OneToMany } from 'typeorm';
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

  @Column((type) => Position)
  @Field((type) => Position)
  public positionTopLeft: Position;

  @Column((type) => Position)
  @Field((type) => Position)
  public positionBotRight: Position;

  @Field((type) => Rect)
  public region: Rect;

  @ManyToOne((type) => Ocean)
  @Field((type) => Ocean)
  public ocean: Ocean;

  @OneToMany((type) => Fleet, (fleet) => fleet.seaSection)
  @Field((type) => [ Fleet ])
  public fleets: Fleet[];
}
