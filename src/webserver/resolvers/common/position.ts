import { InputType, Field } from 'type-graphql';

@InputType()
export class PositionInput {

  @Field()
  public x: number;

  @Field()
  public y: number;
}
