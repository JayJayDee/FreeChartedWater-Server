import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Champion } from './champion';

@Entity()
@ObjectType({ description: 'champion base' })
export class BaseChampion {

  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  public no: number;

  @Column()
  @Field({ description: 'baseChampion Code' })
  public nameCode: string;

  @Column()
  @Field({ description: 'age of champion' })
  public age: number;

  @OneToMany((type) => Champion, (champion) => champion.base)
  @Field((type) => [ Champion ])
  public champions: Champion[];
}
