import { InputType, Field } from 'type-graphql';

@InputType({ description: 'paramter for purchasing product from city' })
export class ProductPurchaseArgs {

  @Field((type) => Number)
  public shipNo: number;

  @Field((type) => Number)
  public productNo: number;

  @Field((type) => Number)
  public userNo: number;
}
