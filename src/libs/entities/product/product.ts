import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, AfterLoad } from 'typeorm';
import { Ship } from '../ship';
import { City } from '../city';
import { ObjectType, Field, ID, registerEnumType } from 'type-graphql';
import { BaseProduct } from './base-product';

enum ProductStatusEnum {
  SPAWNED = 'SPAWNED',
  SHIPPED = 'SHIPPED',
}

type ProductStatus = 'SPAWNED' | 'SHIPPED';

registerEnumType(ProductStatusEnum, {
  name: 'ProductStatus',
  description: 'product status, SPAWNED | SHIPPED',
});

@Entity()
@ObjectType()
export class Product {

  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  public no: number;

  @Column()
  @Field()
  public price: number;

  @Column()
  @Field()
  public level: number;

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

  @Field((type) => ProductStatusEnum)
  public status: ProductStatus;

  @AfterLoad()
  private updateStatus() {
    if (this.producedBy) {
      this.status = 'SPAWNED';
    } else {
      this.status = 'SHIPPED';
    }
  }
}
