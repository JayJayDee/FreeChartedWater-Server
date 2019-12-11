import { ObjectType, Field } from "type-graphql";
import { City } from "../../../libs/entities";

@ObjectType()
export class FoundSection {

  @Field((type) => [ City ])
  public cities: City[];
}
