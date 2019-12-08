import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BaseItem } from './base-item';
import { User } from '../user';
import { Champion } from '../champion';
import { ObjectType, Field, ID } from 'type-graphql';

@Entity()
@ObjectType()
export class Item {

  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  public no: number;

  @ManyToOne((type) => BaseItem)
  @Field((type) => BaseItem)
  public base: BaseItem;

  @ManyToOne((type) => User, (user) => user.items, { nullable: true })
  @Field((type) => User, { nullable: true })
  public owner: User | null;

  @ManyToOne((type) => Champion, (champion) => champion.equippedItems, { nullable: true })
  @Field((type) => Champion, { nullable: true })
  public ownedChampion: Champion | null;
}
