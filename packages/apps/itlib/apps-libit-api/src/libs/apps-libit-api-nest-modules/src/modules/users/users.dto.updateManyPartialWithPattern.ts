import { UsersDtoUpdateOnePartial } from './users.dto.updateOnePartial';
import { RequestsDtoBodyUpdateOnePartialWithPatternIdInt } from '../../../../api-nest-utils/src';

export class UsersDtoUpdateOnePartialWithPattern extends RequestsDtoBodyUpdateOnePartialWithPatternIdInt<UsersDtoUpdateOnePartial> {}
