import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { Ship } from './ship';
import { ObjectType, Field, ID } from 'type-graphql';

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
  @Field()
  public maxCapacity: number;

  @Column()
  @Field()
  public maxProduct: number;

  @Column()
  @Field()
  public price: number;

  @OneToMany((type) => Ship, (ship) => ship.base)
  @Field((type) => [ Ship ])
  public ships: Ship[];
}
