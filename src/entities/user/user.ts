import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Champion } from '../champion';
import { Fleet } from '../fleet';
import { Ship } from '../ship';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  public no: number;

  @Column({
    length: 45,
  })
  public nickname: string;

  @Column({
    length: 45,
  })
  public email: string;

  @Column()
  public verified: boolean;

  @Column({
    length: 80,
  })
  public password: string;

  @Column()
  public gold: number;

  @OneToMany((type) => Champion, (champion) => champion.owner)
  public champions: Champion[];

  @OneToMany((type) => Fleet, (fleet) => fleet.owner)
  public fleets: Fleet[];

  @OneToMany((type) => Ship, (ship) => ship.owner)
  public ships: Ship[];
}
