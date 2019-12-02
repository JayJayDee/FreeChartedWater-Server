import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../user';
import { Product } from '../product';
import { Fleet } from '../fleet';
import { BaseShip } from './base-ship';

@Entity()
export class Ship {

  @PrimaryGeneratedColumn()
  public no: number;

  @ManyToOne((type) => BaseShip)
  public base: BaseShip;

  @ManyToOne((type) => User)
  public owner: User;

  @ManyToOne((type) => Fleet)
  public fleet: Fleet;

  @OneToMany((type) => Product, (product) => product.loadedBy)
  public products: Product[];
}
