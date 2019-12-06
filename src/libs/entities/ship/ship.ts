import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../user';
import { Product } from '../product';
import { Fleet } from '../fleet';
import { BaseShip } from './base-ship';
import { ObjectType, Field, ID } from 'type-graphql';

@Entity()
@ObjectType()
export class Ship {

  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  public no: number;

  @ManyToOne((type) => BaseShip)
  @Field((type) => BaseShip)
  public base: BaseShip;

  @ManyToOne((type) => User)
  @Field((type) => User)
  public owner: User;

  @ManyToOne((type) => Fleet)
  @Field((type) => Fleet)
  public fleet: Fleet;

  @OneToMany((type) => Product, (product) => product.loadedBy)
  @Field((type) => [ Product ])
  public products: Product[];
}
