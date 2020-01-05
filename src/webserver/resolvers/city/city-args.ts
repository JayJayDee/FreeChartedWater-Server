import { InputType, Field, Int } from 'type-graphql';

@InputType({ description: 'paramter for purchasing product from city' })
export class ProductPurchaseArgs {

  @Field((type) => Int)
  public shipNo: number;

  @Field((type) => Int)
  public productNo: number;

  @Field((type) => Int)
  public userNo: number;
}
