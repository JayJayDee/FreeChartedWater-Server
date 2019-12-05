import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { User } from '../user';
import { BaseChampion } from './base-champion';
import { City } from '../city';

@Entity()
@ObjectType()
export class Champion {

  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  public no: number;

  @OneToOne((type) => BaseChampion)
  @Field((type) => BaseChampion)
  public base: BaseChampion;

  @ManyToOne((type) => User, { nullable: true })
  @Field((type) => User, { nullable: true })
  public owner: User | null;

  @OneToOne((type) => City, { nullable: true })
  @Field((type) => City, { nullable: true })
  public bornIn: City | null;
}
