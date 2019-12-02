import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Country } from './country';
import { Champion } from '../champion';
import { Product } from '../product';

@Entity()
export class City {

  @PrimaryGeneratedColumn()
  public no: number;

  @Column()
  public name: string;

  @ManyToOne((type) => Country)
  public country: Country;

  @OneToMany((type) => Champion, (champion) => champion.bornIn)
  public champions: Champion[];

  @OneToMany((type) => Product, (product) => product.producedBy)
  public products: Product[];
}
