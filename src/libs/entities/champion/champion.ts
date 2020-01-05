import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, Column } from 'typeorm';
import { ObjectType, Field, ID, registerEnumType, Int } from 'type-graphql';
import { User } from '../user';
import { BaseChampion } from './base-champion';
import { City } from '../city';
import { Item } from '../item';
import { AbilityPoints } from './ability-points';

export enum ChampionStatusEnum {
  SPAWNED = 'SPAWNED',
  OWNED = 'OWNED',
}

export type ChampionStatus = 'SPAWNED' | 'OWNED';

registerEnumType(ChampionStatusEnum, {
  name: 'ChampionStatus',
  description: 'SPAWNED | OWNED',
});

@Entity()
@ObjectType()
export class Champion {

  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  public no: number;

  @Column()
  @Field((type) => Int, { description: 'level of champion' })
  public level: number;

  @Column()
  @Field((type) => Int, { description: 'current exp.point'})
  public expCurrent: number;

  @Field((type) => Int, { description: 'max exp.point' })
  public expMax: number;

  @ManyToOne((type) => BaseChampion, (base) => base.champions)
  @Field((type) => BaseChampion)
  public base: BaseChampion;

  @ManyToOne((type) => User, { nullable: true })
  @Field((type) => User, { nullable: true, description: 'owner of champion, can be null' })
  public owner: User | null;

  @ManyToOne((type) => City, (city) => city.champions, { nullable: true })
  @Field((type) => City, { nullable: true, description: 'current city of champion, can be null' })
  public spawn: City | null;

  @OneToMany((type) => Item, (item) => item.ownedChampion)
  @Field((type) => [ Item ], { description: 'equipped items of champion' })
  public equippedItems: Item[];

  @Field((type) => ChampionStatusEnum, { description: 'SPAWNED: just spawned in city, OWNED: owned by user' })
  public status: ChampionStatus;

  @Field((type) => AbilityPoints)
  public abilityPoints: AbilityPoints;
}
