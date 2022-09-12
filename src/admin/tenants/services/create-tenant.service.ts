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
/* handlers */
import { apiRequestHandler } from 'shared/handlers';

interface CreateTenantProps {
    schema: string;
    fullname: string;
    phone_number: string;
    email: string;
    password: string;
}

export const createTenantService = async (props: CreateTenantProps): Promise<ApiResponse<{}>> => {
    const body = new FormData();

    (Object.keys(props) as (keyof CreateTenantProps)[]).forEach(key => body.append(key, props[key]));

    return await apiRequestHandler<ApiResponse<{}>, FormData>({
        instance: AdminApiService,
        endpoint: '/admin/generate-schema',
        token: getCurrentUserToken(),
        method: 'POST',
        body,
        responseSerializer: async data => apiSerializer<{}>(data),
        errorSerializer: error =>
            apiOnErrorSideEffect<ApiResponse<{}>>(
                error,
                is403ErrorResponse,
                async () => await repeatRequestOnRefreshTokenService(() => createTenantService(props)),
                error => apiErrorSerializer<{}>(error)
            ),
    });
};
