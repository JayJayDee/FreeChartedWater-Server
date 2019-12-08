import { Entity, PrimaryGeneratedColumn, ManyToOne, AfterLoad, OneToMany } from 'typeorm';
import { ObjectType, Field, ID, registerEnumType } from 'type-graphql';
import { User } from '../user';
import { BaseChampion } from './base-champion';
import { City } from '../city';
import { Item } from '../item';

enum ChampionStatusEnum {
  SPAWNED = 'SPAWNED',
  OWNED = 'OWNED',
}

type ChampionStatus = 'SPAWNED' | 'OWNED';

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

  @ManyToOne((type) => BaseChampion, (base) => base.champions)
  @Field((type) => BaseChampion)
  public base: BaseChampion;

  @ManyToOne((type) => User, { nullable: true })
  @Field((type) => User, { nullable: true })
  public owner: User | null;

  @ManyToOne((type) => City, (city) => city.champions, { nullable: true })
  @Field((type) => City, { nullable: true })
  public spawn: City | null;

  @OneToMany((type) => Item, (item) => item.ownedChampion)
  @Field((type) => [ Item ])
  public equippedItems: Item[];

  @Field((type) => ChampionStatusEnum)
  public status: ChampionStatus;

  @AfterLoad()
  private afterLoad() {
    if (this.spawn) {
      this.status = 'SPAWNED';
    } else {
      this.status = 'OWNED';
    }
  }
}
