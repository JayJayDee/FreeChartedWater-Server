import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Ship } from '../ship';
import { City } from '../city';
import { ObjectType, Field, ID } from 'type-graphql';
import { BaseProduct } from './base-product';

@Entity()
@ObjectType()
export class Product {

  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  public no: number;

  @Column()
  @Field()
  public price: number;

  @ManyToOne((type) => BaseProduct)
  @Field((type) => BaseProduct)
  public base: BaseProduct;

  @ManyToOne((type) => Ship, {
    nullable: true,
  })
  @Field((type) => Ship, {
    nullable: true,
  })
  public loadedBy: Ship | null;

  @ManyToOne((type) => City, {
    nullable: true,
  })
  @Field((type) => City, {
    nullable: true,
  })
  public producedBy: City | null;
}
