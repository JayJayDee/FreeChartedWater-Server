import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { Ship } from './ship';
import { ObjectType, Field, ID, Int } from 'type-graphql';

@Entity()
@ObjectType()
export class BaseShip {

  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  public no: number;

  @Column()
  @Field()
  public nameCode: string;

  @Column()
  @Field((type) => Int)
  public maxCapacity: number;

  @Column()
  @Field((type) => Int)
  public maxProduct: number;

  @Column()
  @Field((type) => Int)
  public maxCrew: number;

  @Column()
  @Field((type) => Int)
  public maxHealth: number;

  @Column()
  @Field((type) => Int)
  public price: number;

  @OneToMany((type) => Ship, (ship) => ship.base)
  @Field((type) => [ Ship ])
  public ships: Ship[];
}
