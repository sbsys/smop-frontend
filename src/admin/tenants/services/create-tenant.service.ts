import { AdminApiService, apiErrorSerializer, ApiResponse, apiSerializer } from 'admin/core';
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
        method: 'POST',
        body,
        responseSerializer: data => apiSerializer<{}>(data),
        errorSerializer: error => apiErrorSerializer<{}>(error),
    });
};
