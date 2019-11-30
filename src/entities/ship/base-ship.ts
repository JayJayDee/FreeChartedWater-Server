import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BaseShip {

  @PrimaryGeneratedColumn()
  public no: number;
}
