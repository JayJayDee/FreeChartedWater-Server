import { MiddlewareFn } from "type-graphql";
import { FCWContext } from "../context";

export const dataLoaders: MiddlewareFn<FCWContext> =
  async ({ context }, next) => {
    // TODO: dataLoder middleware to be implemented.
    next();
  };
