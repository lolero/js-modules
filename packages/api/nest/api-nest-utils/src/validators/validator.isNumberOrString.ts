import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({
  name: 'ValidatorIsNumberOrString',
  async: false,
})
class ValidatorIsNumberOrString implements ValidatorConstraintInterface {
  validate(value: unknown) {
    return typeof value === 'number' || typeof value === 'string';
  }

  defaultMessage() {
    return '($value) must be a number or a string';
  }
}

export function isNumberOrString(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: ValidatorIsNumberOrString,
    });
  };
}
