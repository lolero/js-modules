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
  validate(value: unknown): boolean {
    return typeof value === 'number' || typeof value === 'string';
  }

  defaultMessage(): string {
    return '($value) must be a number or a string';
  }
}

export function isNumberOrString(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: ValidatorIsNumberOrString,
    });
  };
}
