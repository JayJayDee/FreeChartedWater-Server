import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { City } from './city';

@Entity()
@ObjectType()
export class Country {

  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  public no: number;

  @OneToMany((type) => City, (city) => city.country)
  @Field((type) => [ City ])
  public cities: City[];
}
