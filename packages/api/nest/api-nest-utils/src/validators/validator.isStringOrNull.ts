import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({
  name: 'ValidatorIsStringOrNull',
  async: false,
})
class ValidatorIsStringOrNull implements ValidatorConstraintInterface {
  validate(value: unknown): boolean {
    return typeof value === 'string' || value === null;
  }

  defaultMessage(): string {
    return '($value) must be a string or null';
  }
}

export function isStringOrNull(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: ValidatorIsStringOrNull,
    });
  };
}
