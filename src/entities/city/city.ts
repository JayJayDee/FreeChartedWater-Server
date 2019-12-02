import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Country } from './country';

@Entity()
export class City {

  @PrimaryGeneratedColumn()
  public no: number;

  @Column()
  public name: string;

  @ManyToOne((type) => Country)
  public country: Country;
}
