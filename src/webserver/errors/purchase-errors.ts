import { BaseBusinessError } from './business-errors';

export class NotEnoughGoldError extends BaseBusinessError {
  constructor({ userId }: { userId: number }) {
    super('NOT_ENOUGH_GOLD', `not enough gold, ${userId}`);
  }
}

export class InvalidProductStateError extends BaseBusinessError {
  constructor({ productNo }: { productNo: number }) {
    super('INVALID_PRODUCT_STATE', `invalid product state: ${productNo}`);
  }
}
