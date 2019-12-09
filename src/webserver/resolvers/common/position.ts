import { InputType, Field } from 'type-graphql';

@InputType()
export class Position {

  @Field()
  public x: number;

  @Field()
  public y: number;
}
