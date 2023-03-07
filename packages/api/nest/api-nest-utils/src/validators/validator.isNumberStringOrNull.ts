import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({
  name: 'ValidatorIsNumberOrString',
  async: false,
})
export class ValidatorIsNumberStringOrNull
  implements ValidatorConstraintInterface
{
  validate(value: any) {
    return (
      value === null || typeof value === 'number' || typeof value === 'string'
    );
  }

  defaultMessage() {
    return '($value) must be a number, a string, or null';
  }
}
