import type { PipeTransform } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import isUndefined from 'lodash/isUndefined';
import values from 'lodash/values';

// TODO: delete this utility if not used or needed anywhere
export class PipeTransformParseFormDataJson implements PipeTransform {
  constructor(
    private readonly isRequired: boolean,
    private readonly dtoClass?: new () => Record<string, unknown>,
  ) {}

  async transform(value: unknown): Promise<unknown> {
    if (isUndefined(value)) {
      if (this.isRequired) {
        throw new BadRequestException('Value is undefined but not optional');
      }

      return value;
    }

    if (typeof value !== 'string') {
      throw new BadRequestException('Not a string');
    }

    let parsedJsonObject: unknown;
    try {
      parsedJsonObject = JSON.parse(value) as unknown;
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
