import fill from 'lodash/fill';
import floor from 'lodash/floor';
import { PurchaseChange } from './users.types';

export function usersUtilGetChange(amount: number): PurchaseChange {
  const purchaseChangeValues: PurchaseChange = [100, 50, 20, 10, 5];
  const change: PurchaseChange = [];
  let remainingBalance = amount;
  purchaseChangeValues.forEach((value) => {
    const valueCount = floor(remainingBalance / value);
    if (valueCount === 0) {
      return;
    }
    change.push(...fill(Array(valueCount), value));

    remainingBalance -= valueCount * value;
  });

  return change;
}
