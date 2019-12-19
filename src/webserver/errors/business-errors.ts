import { ClassType } from "type-graphql";

export class BaseBusinessError extends Error {
  public code: string;

  constructor(code: string, msg: string) {
    super(msg);
    this.code = code;
  }
}

export class NotFoundError extends BaseBusinessError {
  constructor({ clazz, id }: {
    clazz?: ClassType,
    id: any,
  }) {
    const msg =
      clazz ? `${clazz.name} not found: ${id}` :
      `not found: ${id}`;
    super('NOT_FOUND', msg);
  }
}
