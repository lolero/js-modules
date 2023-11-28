import { UsersPublicDto } from '@js-modules/apps-travel-log-api-core-modules/src/modules/users/dtos/users.public.dto';
import { NodeForm, NodeFormsReducer } from './nodeForms.types';
import { getPkOfNodeForm } from './nodeForms.pkUtils';

export function normalizeUsersPublicDtoArray(
  usersPublicDtoArray: UsersPublicDto[],
): NodeFormsReducer['data'] {
  const normalizedNodeForms: NodeFormsReducer['data'] =
    usersPublicDtoArray.reduce(
      (normalizedNodeFormsTemp: NodeFormsReducer['data'], usersPublicDto) => {
        const nodeForm: NodeForm = {
          id: usersPublicDto.id,
          username: usersPublicDto.username,
          firstName: usersPublicDto.firstName,
          middleName: usersPublicDto.middleName,
          lastName: usersPublicDto.lastName,
          createdAt: usersPublicDto.createdAt,
          deletedAt: usersPublicDto.deletedAt,
        };

        return {
          ...normalizedNodeFormsTemp,
          [getPkOfNodeForm(nodeForm)]: nodeForm,
        };
      },
      {},
    );

  return normalizedNodeForms;
}
