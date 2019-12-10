import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Country } from './country';
import { Champion } from '../champion';
import { Product } from '../product';
import { Fleet } from '../fleet';

@Entity()
@ObjectType()
export class City {

  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  public no: number;

  @Column()
  @Field({ description: 'city code' })
  public nameCode: string;

  @ManyToOne((type) => Country)
  @Field((type) => Country, { description: 'country of city' })
  public country: Country;

  @OneToMany((type) => Fleet, (fleet) => fleet.anchoredCity)
  @Field((type) => [ Fleet ], { description: 'anchored fleets in city' })
  public anchoredFleets: Fleet[];

  @OneToMany((type) => Champion, (champion) => champion.spawn)
  @Field((type) => [ Champion ], { description: 'champions in city' })
  public champions: Champion[];

  @OneToMany((type) => Product, (product) => product.producedBy)
  @Field((type) => [ Product ], { description: 'products which sells in city' })
  public products: Product[];
}
