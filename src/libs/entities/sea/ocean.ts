import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SeaSection } from './sea-section';
import { ObjectType, Field, ID } from 'type-graphql';

@Entity()
@ObjectType()
export class Ocean {

  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  public no: number;

  @Column()
  @Field()
  public nameCode: string;

  @OneToMany((type) => SeaSection, (section) => section.ocean)
  @Field((type) => [ SeaSection ])
  public sections: SeaSection[];
}
