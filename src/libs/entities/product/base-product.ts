import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ObjectType, Field, ID, registerEnumType, Int } from 'type-graphql';
import { Product } from './product';

enum ProductTypeEnum {
  LUXURY = 'LUXURY',
  CLOTH = 'CLOTH',
  GROCERY = 'GROCERY',
  LIQUOR = 'LIQUOR',
  SPICE = 'SPICE',
  MINERAL = 'MINERAL',
  CROP = 'CROP',
  FANCY_GOODS = 'FANCY_GOODS',
  DYE = 'DYE',
}

registerEnumType(ProductTypeEnum, {
  name: 'ProductType',
  description: 'product type',
});

type ProductType =
  'LUXURY' |
  'CLOTH' |
  'GROCERY' |
  'LIQUOR' |
  'SPICE' |
  'MINERAL' |
  'CROP' |
  'FANCY_GOODS' |
  'DYE';

@Entity()
@ObjectType()
export class BaseProduct {

  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  public no: number;

  @Column()
  @Field()
  public nameCode: string;

  @Column({
    type: 'enum',
    enum: ProductTypeEnum,
  })
  @Field((type) => ProductTypeEnum)
  public type: ProductType;

  @Column()
  @Field((type) => Int)
  public price: number;

  @OneToMany((type) => Product, (product) => product.base)
  public products: Product[];
}
