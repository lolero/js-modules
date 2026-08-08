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
  validate(value: unknown): boolean {
    return typeof value === 'number' || value === null;
  }

  defaultMessage(): string {
    return '($value) must be a number or null';
  }
}

export function isNumberOrNull(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: ValidatorIsNumberOrNull,
    });
  };
}
