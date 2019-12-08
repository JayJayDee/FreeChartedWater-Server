import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, OneToMany } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { Ocean } from './ocean';
import { Fleet } from '..';

@Entity()
@ObjectType()
export class SeaSection {

  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  public no: number;

  @Column()
  @Field()
  public posTopLeft: number;

  @Column()
  @Field()
  public posBottomRight: number;

  @ManyToOne((type) => Ocean)
  @Field((type) => Ocean)
  public ocean: Ocean;

  @OneToMany((type) => Fleet, (fleet) => fleet.seaSection)
  @Field((type) => [ Fleet ])
  public fleets: Fleet[];
}
