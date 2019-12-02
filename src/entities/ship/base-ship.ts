import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Ship } from './ship';

@Entity()
export class BaseShip {

  @PrimaryGeneratedColumn()
  public no: number;

  @OneToMany((type) => Ship, (ship) => ship.base)
  public ships: Ship[];
}
