import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Item } from './item';

@Entity()
@ObjectType()
export class BaseItem {

  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  public no: number;

  @Column({
    length: 40,
  })
  @Field()
  public name: string;

  @OneToMany((type) => Item, (item) => item.base)
  @Field((type) => [ Item ])
  public items: Item[];
}
