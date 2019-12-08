import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, Column } from 'typeorm';
import { User } from '../user';
import { Product } from '../product';
import { Fleet } from '../fleet';
import { BaseShip } from './base-ship';
import { ObjectType, Field, ID } from 'type-graphql';
import { Item } from '../item';

@Entity()
@ObjectType()
export class Ship {

  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  public no: number;

  @Column()
  @Field()
  public name: string;

  @Column()
  @Field()
  public maxCapacity: number;

  @Column()
  @Field()
  public maxProduct: number;

  @Column()
  @Field()
  public maxCrew: number;

  @Column()
  @Field()
  public maxHealth: number;

  @Column()
  @Field()
  public currentHealth: number;

  @ManyToOne((type) => BaseShip)
  @Field((type) => BaseShip)
  public base: BaseShip;

  @ManyToOne((type) => User)
  @Field((type) => User)
  public owner: User;

  @ManyToOne((type) => Fleet, (fleet) => fleet.ships, { nullable: true })
  @Field((type) => Fleet, { nullable: true })
  public fleet: Fleet;

  @OneToMany((type) => Product, (product) => product.loadedBy)
  @Field((type) => [ Product ])
  public products: Product[];

  @OneToMany((type) => Item, (item) => item.ownedShip)
  @Field((type) => [ Item ])
  public equippedItems: Item[];
}
