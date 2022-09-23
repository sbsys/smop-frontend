/* services */
import { AdminApiService, apiErrorSerializer, ApiResponse, apiSerializer } from 'admin/core';
/* handlers */
import { apiRequestHandler } from 'shared/handlers';

interface PasswordRecoveryProps {
    email: string;
    password: string;
    newPassword: string;
}

export const passwordRecoveryService = async (props: PasswordRecoveryProps): Promise<ApiResponse<{}>> => {
    const body = new FormData();

    (Object.keys(props) as (keyof PasswordRecoveryProps)[]).forEach(key => body.append(key, props[key]));

    return await apiRequestHandler<ApiResponse<{}>, FormData>({
        instance: AdminApiService,
        endpoint: '/auth/reset-password',
        method: 'PUT',
        body,
        responseSerializer: async data => apiSerializer<{}>(data),
        errorSerializer: async error => apiErrorSerializer<{}>(error),
    });
};
