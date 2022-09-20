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
import { tenantListSerializer } from '../serializers';
/* handlers */
import { apiRequestHandler } from 'shared/handlers';
/* utils */
import { parse } from 'date-fns';
/* types */
import { TenantItemDTO } from '../types';

interface ListTenantProps {}

const mock: ApiResponse<TenantItemDTO[]> = {
    error: false,
    message: 'Tenan list',
    data: [
        {
            id: 1,
            name: 'Admin Churrascos',
            schema: 'churrascos',
            email: 'admin@churrascos.com',
            phone: '+505-88664422',
            created: parse('2020-08-30', 'yyyy-MM-dd', Date.now()),
            state: 'active',
        },
        {
            id: 2,
            name: 'Admin Primas',
            schema: 'primas',
            email: 'admin@primas.com',
            phone: '+505-77553311',
            created: parse('2021-02-27', 'yyyy-MM-dd', Date.now()),
            state: 'inactive',
        },
    ],
};

export const tenantListService = async (props?: ListTenantProps): Promise<ApiResponse<TenantItemDTO[]>> => {
    if (offline) return mock;
    /* const body = new FormData();

    (Object.keys(props) as (keyof ListTenantProps)[]).forEach(key => body.append(key, props[key])); */

    return await apiRequestHandler<ApiResponse<TenantItemDTO[]>>({
        instance: AdminApiService,
        endpoint: '/admin/schema',
        token: getCurrentUserToken(),
        method: 'GET',
        responseSerializer: async data => apiSerializer<TenantItemDTO[]>(data, tenantListSerializer),
        errorSerializer: error =>
            apiOnErrorSideEffect<ApiResponse<TenantItemDTO[]>>(
                error,
                is403ErrorResponse,
                async () =>
                    (await repeatRequestOnRefreshTokenService(() => tenantListService(props))) as ApiResponse<
                        TenantItemDTO[]
                    >,
                error => apiErrorSerializer<TenantItemDTO[]>(error)
            ),
    });
};
