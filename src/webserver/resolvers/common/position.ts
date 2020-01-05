import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class PositionInput {

  @Field((type) => Int)
  public x: number;

  @Field((type) => Int)
  public y: number;
}
