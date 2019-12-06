import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Champion } from '../champion';
import { Fleet } from '../fleet';
import { Ship } from '../ship';

@Entity()
@ObjectType()
export class User {

  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  public no: number;

  @Column({
    length: 45,
  })
  @Field()
  public nickname: string;

  @Column({
    length: 45,
  })
  @Field()
  public email: string;

  @Column()
  @Field()
  public verified: boolean;

  @Column({
    length: 80,
  })
  @Field()
  public password: string;

  @Column()
  @Field()
  public gold: number;

  @OneToMany((type) => Champion, (champion) => champion.owner)
  @Field((type) => [ Champion ])
  public champions: Champion[];

  @OneToMany((type) => Fleet, (fleet) => fleet.owner)
  @Field((type) => [ Fleet ])
  public fleets: Fleet[];

  @OneToMany((type) => Ship, (ship) => ship.owner)
  @Field((type) => [ Ship ])
  public ships: Ship[];
}
