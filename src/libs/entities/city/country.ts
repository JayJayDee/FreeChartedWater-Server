import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { City } from './city';

@Entity()
@ObjectType()
export class Country {

  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  public no: number;

  @Column()
  @Field()
  public nameCode: string;

  @OneToMany((type) => City, (city) => city.country)
  @Field((type) => [ City ])
  public cities: City[];
}
