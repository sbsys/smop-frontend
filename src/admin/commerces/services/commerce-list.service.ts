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
import { commerceListSerializer } from '../serializers';
/* handlers */
import { apiRequestHandler } from 'shared/handlers';
/* utils */
import { parse } from 'date-fns';
/* types */
import { CommerceListItemDTO } from '../types';

interface CommerceListProps {}

const mock: ApiResponse<CommerceListItemDTO[]> = {
    error: false,
    message: 'Commerce list',
    data: [
        {
            id: 1,
            name: 'Commerce Active',
            createdAt: parse('2020-08-30', 'yyyy-MM-dd', Date.now()),
            isActive: 'active',
        },
        {
            id: 2,
            name: 'Commerce Inactive',
            createdAt: parse('2021-08-28', 'yyyy-MM-dd', Date.now()),
            isActive: 'inactive',
        },
    ],
};

export const commerceListService = async (props?: CommerceListProps): Promise<ApiResponse<CommerceListItemDTO[]>> => {
    if (offline) return mock;
    /* const body = new FormData();

    (Object.keys(props) as (keyof CommerceListProps)[]).forEach(key => body.append(key, props[key])); */

    return await apiRequestHandler<ApiResponse<CommerceListItemDTO[]>>({
        instance: AdminApiService,
        endpoint: '/commerce',
        token: getCurrentUserToken(),
        method: 'GET',
        responseSerializer: async data => apiSerializer<CommerceListItemDTO[]>(data, commerceListSerializer),
        errorSerializer: error =>
            apiOnErrorSideEffect<ApiResponse<CommerceListItemDTO[]>>(
                error,
                is403ErrorResponse,
                async () =>
                    (await repeatRequestOnRefreshTokenService(() => commerceListService(props))) as ApiResponse<
                        CommerceListItemDTO[]
                    >,
                error => apiErrorSerializer<CommerceListItemDTO[]>(error)
            ),
    });
};
