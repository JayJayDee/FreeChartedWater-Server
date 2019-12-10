import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
export class Position {

  @Field((type) => Int)
  public x: number;

  @Field((type) => Int)
  public y: number;
}
