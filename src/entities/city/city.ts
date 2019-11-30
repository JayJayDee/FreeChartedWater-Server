import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class City {

  @PrimaryGeneratedColumn()
  public no: number;
}
