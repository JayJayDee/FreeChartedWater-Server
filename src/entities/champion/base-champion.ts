import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Champion } from './champion';

@Entity()
export class BaseChampion {

  @PrimaryGeneratedColumn()
  public no: number;

  @OneToMany((type) => Champion, (champion) => champion.base)
  public champions: Champion[];
}
