import { DtoUpdateManyPartialWithPattern } from '@js-modules/api-nest-utils';
import type { UsersUpdateOnePartialDto } from './users.updateOnePartial.dto';

export class UsersUpdateManyPartialWithPatternDto extends DtoUpdateManyPartialWithPattern<UsersUpdateOnePartialDto> {}
