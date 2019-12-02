import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../user';
import { Ship } from '../ship';

@Entity()
export class Fleet {

  @PrimaryGeneratedColumn()
  public no: number;

  @ManyToOne((type) => User)
  public owner: User;

  @OneToMany((type) => Ship, (ship) => ship.fleet)
  public ships: Ship[];
}
