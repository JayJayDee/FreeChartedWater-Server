import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Section } from './section';

@Entity()
export class Ocean {

  @PrimaryGeneratedColumn()
  public no: number;

  @Column()
  public name: string;

  @OneToMany((type) => Section, (section) => section.ocean)
  public sections: Section[];
}
