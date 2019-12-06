import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Product } from '..';

@Entity()
@ObjectType()
export class BaseProduct {

  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  public no: number;

  @Column()
  @Field()
  public name: string;

  @OneToMany((type) => Product, (product) => product.base)
  public products: Product[];
}
