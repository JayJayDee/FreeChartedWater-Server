import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { ObjectType, Field, ID, registerEnumType } from 'type-graphql';
import { Item } from './item';

export enum ItemTypeEnum {
  CONSUMERABLE = 'COMSUMERABLE',
  EQUIPABLE = 'EQUIPABLE',
}
type ItemType = 'CONSUMERABLE' | 'EQUIPABLE';

export enum ItemEffectTypeEnum {
  CHAMPION = 'CHAMPION',
  SHIP = 'SHIP',
}
type ItemEffectType = 'CHAMPION' | 'SHIP';

// type-graphQL enum registration
registerEnumType(ItemTypeEnum, {
  name: 'ItemType',
  description: 'item type, CONSUMERABLE | EQUIPABLE',
});
registerEnumType(ItemEffectTypeEnum, {
  name: 'ItemEffectType',
  description: 'item target, CHAMPION | SHIP',
});

@Entity()
@ObjectType()
export class BaseItem {

  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  public no: number;

  @Column({
    length: 40,
  })
  @Field({ description: 'code of baseItem' })
  public nameCode: string;

  @Column({
    type: 'enum',
    enum: ItemTypeEnum,
  })
  @Field({ description: 'item type, EQUIPABLE | CONSUMERABLE' })
  public type: ItemType;

  @Column({
    type: 'enum',
    enum: ItemEffectTypeEnum,
  })
  @Field({ description: 'effect target, CHAMPION | SHIP' })
  public effectType: ItemEffectType;

  @Column()
  @Field({ description: 'item effection point' })
  public effectPoint: number;

  @OneToMany((type) => Item, (item) => item.base)
  @Field((type) => [ Item ])
  public items: Item[];
}
