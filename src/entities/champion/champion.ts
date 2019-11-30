import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Champion {

  @PrimaryGeneratedColumn()
  public no: number;
}
