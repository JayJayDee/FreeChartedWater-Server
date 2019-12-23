import { AbstractRepository, EntityRepository, In } from 'typeorm';
import { Ship } from '../entities';
import DataLoader from 'dataloader';

@EntityRepository(Ship)
export class ShipRepository extends AbstractRepository<Ship> {

}
