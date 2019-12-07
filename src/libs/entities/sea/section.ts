import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Ocean } from './ocean';

@Entity()
export class Section {

  @PrimaryGeneratedColumn()
  public no: number;

  @ManyToOne((type) => Ocean)
  public ocean: Ocean;
}
