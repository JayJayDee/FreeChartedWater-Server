import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Country } from './country';
import { Champion } from '../champion';
import { Product } from '../product';

@Entity()
@ObjectType()
export class City {

  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  public no: number;

  @Column()
  @Field()
  public name: string;

  @ManyToOne((type) => Country)
  @Field((type) => Country)
  public country: Country;

  @OneToMany((type) => Champion, (champion) => champion.bornIn)
  @Field((type) => [ Champion ])
  public champions: Champion[];

  @OneToMany((type) => Product, (product) => product.producedBy)
  public products: Product[];
}
