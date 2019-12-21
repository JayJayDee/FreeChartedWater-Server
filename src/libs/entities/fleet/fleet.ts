import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, Column } from 'typeorm';
import { User } from '../user';
import { Ship } from '../ship';
import { SeaSection } from '../sea';
import { ObjectType, Field, ID } from 'type-graphql';
import { City } from '../city';
import { Position } from '../common';

@Entity()
@ObjectType()
export class Fleet {

  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  public no: number;

  @Column({
    length: 40,
  })
  @Field({ description: 'fleet name.' })
  public name: string;

  @Column((type) => Position)
  @Field((type) => Position)
  public position: Position;

  @Column((type) => Position)
  @Field((type) => Position, { nullable: true })
  public direction?: Position;

  @ManyToOne((type) => City)
  @Field((type) => City, { nullable: true,  description: 'the fleet anchored city' })
  public anchoredCity: City | null;

  @ManyToOne((type) => User)
  @Field((type) => User, { description: 'owner(user) of fleet' })
  public owner: User;

  @ManyToOne((type) => SeaSection, { nullable: true })
  @Field((type) => SeaSection, { nullable: true })
  public seaSection: SeaSection | null;

  @OneToMany((type) => Ship, (ship) => ship.fleet)
  @Field((type) => [ Ship ], { description: 'ships in fleet' })
  public ships: Ship[];

  @Field((type) => Number, { nullable: true, description: 'fleet cruising speed' })
  public cruisingSpeed: number | null;

  @Field((type) => Boolean, { description: 'notates if the fleet can sail' })
  public canSail: boolean;
}
