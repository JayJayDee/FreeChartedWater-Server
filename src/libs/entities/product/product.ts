import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Ship } from '../ship';
import { City } from '../city';

@Entity()
export class Product {

  @PrimaryGeneratedColumn()
  public no: number;

  @ManyToOne((type) => Ship, {
    nullable: true,
  })
  public loadedBy: Ship | null;

  @ManyToOne((type) => City, {
    nullable: true,
  })
  public producedBy: City | null;
}
