import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { City } from './city';

@Entity()
export class Country {

  @PrimaryGeneratedColumn()
  public no: number;

  @OneToMany((type) => City, (city) => city.country)
  public cities: City[];
}
