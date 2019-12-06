import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Ship } from './ship';
import { ObjectType, Field, ID } from 'type-graphql';

@Entity()
@ObjectType()
export class BaseShip {

  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  public no: number;

  @OneToMany((type) => Ship, (ship) => ship.base)
  @Field((type) => [ Ship ])
  public ships: Ship[];
}
