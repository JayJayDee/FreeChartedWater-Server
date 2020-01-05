import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, Column } from 'typeorm';
import { User } from '../user';
import { Product } from '../product';
import { Fleet } from '../fleet';
import { BaseShip } from './base-ship';
import { ObjectType, Field, ID, Int } from 'type-graphql';
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
  @Field((type) => Int)
  public maxCapacity: number;

  @Column()
  @Field((type) => Int)
  public currentCapacity: number;

  @Column()
  @Field((type) => Int)
  public maxProduct: number;

  @Column()
  @Field((type) => Int)
  public maxCrew: number;

  @Column()
  @Field((type) => Int)
  public currentCrew: number;

  @Column()
  @Field((type) => Int)
  public maxHealth: number;

  @Column()
  @Field((type) => Int)
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

  @Field((type) => Number, { nullable: true })
  public cruisingSpeed: number | null;

  @Field((type) => Int, { nullable: true })
  public availableCruisingDay: number | null;
}
