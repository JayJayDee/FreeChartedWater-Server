import { AbstractRepository, EntityRepository } from 'typeorm';
import { Product } from '../entities';

@EntityRepository(Product)
export class ProductRepository extends AbstractRepository<Product> {

}
