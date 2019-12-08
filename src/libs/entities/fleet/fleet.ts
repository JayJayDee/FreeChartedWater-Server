import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, Column } from 'typeorm';
import { User } from '../user';
import { Ship } from '../ship';
import { SeaSection } from '../sea';
import { ObjectType, Field, ID } from 'type-graphql';

@Entity()
@ObjectType()
export class Fleet {

  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  public no: number;

  @Column({
    length: 40,
  })
  @Field()
  public name: string;

  @ManyToOne((type) => User)
  @Field((type) => User)
  public owner: User;

  @ManyToOne((type) => SeaSection, { nullable: true })
  @Field((type) => SeaSection, { nullable: true })
  public seaSection: SeaSection | null;

  @OneToMany((type) => Ship, (ship) => ship.fleet)
  @Field((type) => [ Ship ])
  public ships: Ship[];
}
