import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({
  name: 'ValidatorIsNumberOrNull',
  async: false,
})
class ValidatorIsNumberOrNull implements ValidatorConstraintInterface {
  validate(value: any) {
    return typeof value === 'number' || value === null;
  }

  defaultMessage() {
    return '($value) must be a number or null';
  }
}

export function isNumberOrNull(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: ValidatorIsNumberOrNull,
    });
  };
}
