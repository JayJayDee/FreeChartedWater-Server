import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Item {

  @PrimaryGeneratedColumn()
  public no: number;
}
