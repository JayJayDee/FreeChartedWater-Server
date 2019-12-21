import { Resolver, FieldResolver, Root } from 'type-graphql';
import { getRepository } from 'typeorm';
import { BaseProduct, Product, Ship, Enums } from '../../../libs/entities';

@Resolver((of) => BaseProduct)
export class BaseProductResolver {

  @FieldResolver((type) => [ Product ])
  public async products(@Root() base: BaseProduct) {
    const b = await getRepository(BaseProduct).findOne({
      where: { no: base.no },
      relations: [ 'products' ],
    });
    if (!b) {
      return [];
    }
    return b.products;
  }
}

@Resolver((of) => Product)
export class ProductResolver {

  @FieldResolver((type) => BaseProduct)
  public async base(@Root() product: Product) {
    const prd = await getRepository(Product).findOne({
      where: { no: product.no },
      relations: [ 'base' ],
    });
    if (!prd) {
      return null;
    }
    return prd.base;
  }

  @FieldResolver((type) => Ship)
  public async loadedBy(@Root() product: Product) {
    const prd = await getRepository(Product).findOne({
      where: { no: product.no },
      relations: [ 'loadedBy' ],
    });
    if (!prd) {
      return null;
    }
    return prd.loadedBy;
  }

  @FieldResolver((type) => Ship)
  public async producedBy(@Root() product: Product) {
    const prd = await getRepository(Product).findOne({
      where: { no: product.no },
      relations: [ 'producedBy' ],
    });
    if (!prd) {
      return null;
    }
    return prd.producedBy;
  }

  @FieldResolver((type) => Enums.ProductStatusEnum)
  public async status(@Root() root: Product): Promise<'SPAWNED' | 'SHIPPED'> {
    const prd = await getRepository(Product).findOne({
      where: { no: root.no },
      relations: [ 'producedBy', 'loadedBy' ],
    });

    if (!prd) {
      throw new Error('product not found');
    }

    if (prd.loadedBy) {
      return 'SHIPPED';
    }
    return 'SPAWNED';
  }
}
