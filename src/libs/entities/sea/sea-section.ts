import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, OneToMany } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { Ocean } from './ocean';
import { Fleet } from '../fleet';
import { Rect } from '../common';

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
}
