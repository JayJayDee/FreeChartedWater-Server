import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ship {

  @PrimaryGeneratedColumn()
  public no: number;
}
