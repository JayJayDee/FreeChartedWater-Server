import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
export class AbilityPoints {

  @Field((type) => Int)
  public trading: number;

  @Field((type) => Int)
  public health: number;

  @Field((type) => Int)
  public battle: number;

  @Field((type) => Int)
  public navigation: number;

  @Field((type) => Int)
  public leadership: number;
}
