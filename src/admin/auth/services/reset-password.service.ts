/* services */
import { AdminApiService, apiErrorSerializer, ApiResponse, apiSerializer } from 'admin/core';
/* handlers */
import { apiRequestHandler } from 'shared/handlers';

interface ResetPasswordProps {
    email: string;
    password: string;
    newPassword: string;
}

export const resetPasswordService = async (props: ResetPasswordProps): Promise<ApiResponse<{}>> => {
    const body = new FormData();

    (Object.keys(props) as (keyof ResetPasswordProps)[]).forEach(key => body.append(key, props[key]));

    return await apiRequestHandler<ApiResponse<{}>, FormData>({
        instance: AdminApiService,
        endpoint: '/auth/reset-password',
        method: 'PUT',
        body,
        responseSerializer: async data => apiSerializer<{}>(data),
        errorSerializer: async error => apiErrorSerializer<{}>(error),
    });
};
