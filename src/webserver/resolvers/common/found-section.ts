import { ObjectType, Field } from "type-graphql";
import { City, Product, Item } from "../../../libs/entities";

@ObjectType()
export class FoundSection {

  @Field((type) => [ City ])
  public cities: City[];

  @Field((type) => [ Product ])
  public products: Product[];

  @Field((type) => [ Item ])
  public items: Item[];
}
