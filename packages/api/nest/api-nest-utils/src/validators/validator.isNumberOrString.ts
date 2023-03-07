import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({
  name: 'ValidatorIsNumberOrString',
  async: false,
})
export class ValidatorIsNumberOrString implements ValidatorConstraintInterface {
  validate(value: any) {
    return typeof value === 'number' || typeof value === 'string';
  }

  defaultMessage() {
    return '($value) must be a number or a string';
  }
}
