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

export const updateStatusService = async (userId: string): Promise<ApiResponse<{}>> => {
    return await apiRequestHandler<ApiResponse<{}>>({
        instance: AdminApiService,
        endpoint: `/account/${userId}/status`,
        token: getCurrentUserToken(),
        method: 'PUT',
        responseSerializer: async data => apiSerializer<{}>(data),
        errorSerializer: error =>
            apiOnErrorSideEffect<ApiResponse<{}>>(
                error,
                is403ErrorResponse,
                async () =>
                    (await repeatRequestOnRefreshTokenService(() => updateStatusService(userId))) as ApiResponse<{}>,
                error => apiErrorSerializer<{}>(error)
            ),
    });
};
