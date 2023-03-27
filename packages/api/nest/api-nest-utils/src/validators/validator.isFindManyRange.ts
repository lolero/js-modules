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
  validate(value: any) {
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

  defaultMessage() {
    return '($value) must be a tuple of numbers, strings or nulls';
  }
}

export function isFindManyRange(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: ValidatorIsFindManyRange,
    });
  };
}
