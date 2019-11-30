import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BaseChampion {

  @PrimaryGeneratedColumn()
  public no: number;
}
