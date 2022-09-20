/* services */
import {
    AdminApiService,
    apiErrorSerializer,
    apiOnErrorSideEffect,
    ApiResponse,
    apiSerializer,
    is403ErrorResponse,
} from 'admin/core';
import { getCurrentUserToken, repeatRequestOnRefreshTokenService } from 'admin/auth';
/* serializers */
import { createTenantSerializer } from '../serializers';
/* handlers */
import { apiRequestHandler } from 'shared/handlers';

interface CreateTenantProps {
    schema: string;
    fullname: string;
    phone_number: string;
    email: string;
    password: string;
}

export interface CreateTenantResponse {
    schema: string;
    organizationId: string;
}

export const createTenantService = async (props: CreateTenantProps): Promise<ApiResponse<CreateTenantResponse>> => {
    const body = new FormData();

    (Object.keys(props) as (keyof CreateTenantProps)[]).forEach(key => body.append(key, props[key]));

    return await apiRequestHandler<ApiResponse<CreateTenantResponse>, FormData>({
        instance: AdminApiService,
        endpoint: '/admin/generate-schema',
        token: getCurrentUserToken(),
        method: 'POST',
        body,
        responseSerializer: async data => apiSerializer<CreateTenantResponse>(data, createTenantSerializer),
        errorSerializer: error =>
            apiOnErrorSideEffect<ApiResponse<CreateTenantResponse>>(
                error,
                is403ErrorResponse,
                async () =>
                    (await repeatRequestOnRefreshTokenService(() =>
                        createTenantService(props)
                    )) as ApiResponse<CreateTenantResponse>,
                error => apiErrorSerializer<CreateTenantResponse>(error)
            ),
    });
};
