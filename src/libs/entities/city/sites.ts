import { ObjectType, Field } from 'type-graphql';
import { Column } from 'typeorm';

@ObjectType()
export class Sites {
  @Column({
    default: false,
  })
  @Field({ description: 'has a pub' })
  public hasPub: boolean;

  @Column({
    default: false,
  })
  @Field({ description: 'has a inn' })
  public hasInn: boolean;

  @Column({
    default: false,
  })
  @Field({ description: 'has a ship-building-yard' })
  public hasShipBuildingYard: boolean;

  @Column({
    default: false,
  })
  @Field({ description: 'has a trading post' })
  public hasTradingPost: boolean;
}
