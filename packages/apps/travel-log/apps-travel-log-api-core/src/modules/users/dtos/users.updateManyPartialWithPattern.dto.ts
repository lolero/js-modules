import { DtoUpdateOnePartialWithPatternIdInt } from '@js-modules/api-nest-utils';
import { UsersUpdateOnePartialDto } from './users.updateOnePartial.dto';

export class UsersUpdateManyPartialWithPatternDto extends DtoUpdateOnePartialWithPatternIdInt<UsersUpdateOnePartialDto> {}
