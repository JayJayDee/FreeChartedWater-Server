import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Fleet {

  @PrimaryGeneratedColumn()
  public no: number;
}
