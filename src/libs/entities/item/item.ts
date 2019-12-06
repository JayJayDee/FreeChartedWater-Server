import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BaseItem } from '..';
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
}
