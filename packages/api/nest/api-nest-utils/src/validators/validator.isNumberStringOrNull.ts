import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({
  name: 'ValidatorIsNumberStringOrNull',
  async: false,
})
class ValidatorIsNumberStringOrNull implements ValidatorConstraintInterface {
  validate(value: any) {
    return (
      typeof value === 'number' || typeof value === 'string' || value === null
    );
  }

  defaultMessage() {
    return '($value) must be a number, a string, or null';
  }
}

export function isNumberStringOrNull(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: ValidatorIsNumberStringOrNull,
    });
  };
}
