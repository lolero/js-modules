import { RequestsDtoBodyUpdateOnePartialWithPatternIdInt } from '@js-modules/apps-nest-utils';
import { UsersDtoUpdateOnePartial } from './users.dto.updateOnePartial';

export class UsersDtoUpdateOnePartialWithPattern extends RequestsDtoBodyUpdateOnePartialWithPatternIdInt<UsersDtoUpdateOnePartial> {}
