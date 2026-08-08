import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import isArray from 'lodash/isArray';

@ValidatorConstraint({
  name: 'ValidatorIsFindManyRange',
  async: false,
})
class ValidatorIsFindManyRange implements ValidatorConstraintInterface {
  validate(value: unknown): boolean {
    if (!isArray(value)) {
      return false;
    }
    if (value.length !== 2) {
      return false;
    }
    if (
      typeof value[0] !== 'number' &&
      typeof value[0] !== 'string' &&
      value[0] !== null &&
      typeof value[1] !== 'number' &&
      typeof value[1] !== 'string' &&
      value[1] !== null
    ) {
      return false;
    }

    return true;
  }

  defaultMessage(): string {
    return '($value) must be a tuple of numbers, strings or nulls';
  }
}

export function isFindManyRange(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: ValidatorIsFindManyRange,
    });
  };
}
