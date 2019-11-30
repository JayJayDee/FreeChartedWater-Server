import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BaseProduct {

  @PrimaryGeneratedColumn()
  public no: number;
}
