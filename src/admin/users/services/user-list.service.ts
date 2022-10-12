/* services */
import {
    AdminApiService,
    apiErrorSerializer,
    apiOnErrorSideEffect,
    ApiResponse,
    apiSerializer,
    is403ErrorResponse,
    offline,
} from 'admin/core';
import { getCurrentUserToken, repeatRequestOnRefreshTokenService } from 'admin/auth';
/* serializers */
import { userListSerializer } from '../serializers';
/* handlers */
import { apiRequestHandler } from 'shared/handlers';
/* utils */
import { parse } from 'date-fns';
/* types */
import { UserListItemDTO } from '../types';

interface UserListProps {}

const mock: ApiResponse<UserListItemDTO[]> = {
    error: false,
    message: 'User list',
    data: [
        {
            userId: '1',
            fullname: 'User Active',
            createdAt: parse('2020-08-30', 'yyyy-MM-dd', Date.now()),
            isActive: 'active',
            email: 'mail@mail.com',
            phoneNumber: '+505-88082020',
            profileName: 'admin',
            schemaName: 'primas',
            commerceId: 'lorem',
        },
        {
            userId: '2',
            fullname: 'User Inactive',
            createdAt: parse('2021-08-28', 'yyyy-MM-dd', Date.now()),
            isActive: 'inactive',
            email: 'mail@mail.com',
            phoneNumber: '+505-88082020',
            profileName: 'admin',
            schemaName: 'primas',
            commerceId: 'lorem',
        },
    ],
};

export const userListService = async (props?: UserListProps): Promise<ApiResponse<UserListItemDTO[]>> => {
    if (offline) return mock;
    /* const body = new FormData();

    (Object.keys(props) as (keyof UserListProps)[]).forEach(key => body.append(key, props[key])); */

    return await apiRequestHandler<ApiResponse<UserListItemDTO[]>>({
        instance: AdminApiService,
        endpoint: '/account',
        token: getCurrentUserToken(),
        method: 'GET',
        responseSerializer: async data => apiSerializer<UserListItemDTO[]>(data, userListSerializer),
        errorSerializer: error =>
            apiOnErrorSideEffect<ApiResponse<UserListItemDTO[]>>(
                error,
                is403ErrorResponse,
                async () =>
                    (await repeatRequestOnRefreshTokenService(() => userListService(props))) as ApiResponse<
                        UserListItemDTO[]
                    >,
                error => apiErrorSerializer<UserListItemDTO[]>(error)
            ),
    });
};
