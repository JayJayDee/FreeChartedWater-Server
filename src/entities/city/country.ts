import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Country {

  @PrimaryGeneratedColumn()
  public no: number;
}
