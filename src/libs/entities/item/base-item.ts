import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BaseItem {

  @PrimaryGeneratedColumn()
  public no: number;
}
