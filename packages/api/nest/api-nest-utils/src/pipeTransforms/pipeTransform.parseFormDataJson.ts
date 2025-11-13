import { BadRequestException, PipeTransform } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import isUndefined from 'lodash/isUndefined';
import { values } from 'lodash';

export class PipeTransformParseFormDataJson implements PipeTransform {
  constructor(
    private readonly isRequired: boolean,
    private readonly dtoClass?: new () => any,
  ) {}

  async transform(value: any) {
    if (isUndefined(value)) {
      if (this.isRequired) {
        throw new BadRequestException('Value is undefined but not optional');
      }

      return value;
    }

    if (typeof value !== 'string') {
      throw new BadRequestException('Not a string');
    }

    let parsedJsonObject: any;
    try {
      parsedJsonObject = JSON.parse(value);
    } catch (error) {
      throw new BadRequestException(error, 'Invalid JSON format');
    }

    if (this.dtoClass) {
      const dto = plainToInstance(this.dtoClass, parsedJsonObject);

      const errors = await validate(dto);
      const errorsString = errors
        .map((error) => {
          return values(error.constraints).join(', ');
        })
        .join(', ');
      if (errors.length > 0) {
        throw new BadRequestException(errorsString);
      }
    }

    return parsedJsonObject;
  }
}
