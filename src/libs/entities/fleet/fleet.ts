import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../user';
import { Ship } from '../ship';
import { ObjectType, Field, ID } from 'type-graphql';

@Entity()
@ObjectType()
export class Fleet {

  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  public no: number;

  @ManyToOne((type) => User)
  @Field((type) => User)
  public owner: User;

  @OneToMany((type) => Ship, (ship) => ship.fleet)
  @Field((type) => [ Ship ])
  public ships: Ship[];
}
