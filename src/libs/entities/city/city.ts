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
  public nameCode: string;

  @ManyToOne((type) => Country)
  @Field((type) => Country)
  public country: Country;

  @OneToMany((type) => Champion, (champion) => champion.spawn)
  @Field((type) => [ Champion ])
  public champions: Champion[];

  @OneToMany((type) => Product, (product) => product.producedBy)
  @Field((type) => [ Product ])
  public products: Product[];
}
