import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne } from 'typeorm';
import { User } from '../user';
import { BaseChampion } from './base-champion';
import { City } from '../city';

@Entity()
export class Champion {

  @PrimaryGeneratedColumn()
  public no: number;

  @OneToOne((type) => BaseChampion)
  public base: BaseChampion;

  @ManyToOne((type) => User, {
    nullable: true,
  })
  public owner: User | null;

  @OneToOne((type) => City, {
    nullable: true,
  })
  public bornIn: City | null;
}
