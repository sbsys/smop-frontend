import { AdminApiService, apiErrorSerializer, ApiResponse, apiSerializer } from 'admin/core';
import { apiRequestHandler } from 'shared/handlers';

interface SignInProps {
    email: string;
    password: string;
}

export const signInService = async (props: SignInProps): Promise<ApiResponse<{}>> => {
    const body = new FormData();

    (Object.keys(props) as (keyof SignInProps)[]).forEach(key => body.append(key, props[key]));

    return await apiRequestHandler<ApiResponse<{}>, FormData>({
        instance: AdminApiService,
        endpoint: '/auth/login/admins',
        method: 'POST',
        body,
        responseSerializer: data => apiSerializer<{}>(data),
        errorSerializer: error => apiErrorSerializer<{}>(error),
    });
};
