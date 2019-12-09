import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, Column, AfterLoad } from 'typeorm';
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
  public currentCapacity: number;

  @Column()
  @Field()
  public maxProduct: number;

  @Column()
  @Field()
  public maxCrew: number;

  @Column()
  @Field()
  public currentCrew: number;

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

  @Field((type) => Number, { nullable: true })
  public cruisingSpeed: number | null;

  @Field((type) => Number, { nullable: true })
  public availableCruisingDay: number | null;

  @AfterLoad()
  private afterShipLoad() {
    this.cruisingSpeed =
      calculateCruisingSpeed({
        currentCrew: this.currentCrew,
        maxCrew: this.maxCrew,
        currentCapacity: this.currentCapacity,
        maxCapacity: this.maxCapacity,
      });

    this.availableCruisingDay =
      calculateCruisingDay({
        currentCrew: this.currentCrew,
        currentCapacity: this.currentCapacity,
      });
  }
}

const calculateCruisingSpeed =
  ({ currentCrew, maxCrew, currentCapacity, maxCapacity }: {
    currentCrew: number, maxCrew: number, currentCapacity: number, maxCapacity: number,
  }) => {
    // TODO: calculate cruising speed.
    return 0;
  };

const calculateCruisingDay =
  ({ currentCrew, currentCapacity }: {
    currentCrew: number, currentCapacity: number,
  }) => {
    // TODO: calculate available cruising day.
    return 0;
  };
