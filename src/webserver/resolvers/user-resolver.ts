import { Resolver, Arg } from "type-graphql";
import { User } from "../../libs/entities";
import { getRepository } from "typeorm";

@Resolver(User)
export class UserResolver {

  public async user(@Arg('no') no: number) {
    const user = await getRepository(User).findOne(no);
    return user;
  }
}
