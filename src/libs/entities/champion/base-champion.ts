import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Champion } from './champion';

@Entity()
@ObjectType()
export class BaseChampion {

  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  public no: number;

  @OneToMany((type) => Champion, (champion) => champion.base)
  @Field((type) => [ Champion ])
  public champions: Champion[];
}
