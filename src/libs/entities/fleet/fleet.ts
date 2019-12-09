import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, Column, AfterLoad } from 'typeorm';
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

  @Field((type) => Number, { nullable: true })
  public cruisingSpeed: number | null;

  @AfterLoad()
  private afterFleetLoad() {
    if (!this.ships) {
      return;
    }
    this.cruisingSpeed = calculateAverageCruisingSpeed(this.ships);
  }
}

const calculateAverageCruisingSpeed =
  (ships: Ship[]) =>
      ships.map((s) => s.cruisingSpeed)
      .filter((s) => s !== null)
      .reduce((prev, cur) => ((prev as number) + (cur as number)), 0) as number
    /
      ships.filter((s) => s).length;
