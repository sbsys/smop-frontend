/* services */
import {
    AdminApiService,
    apiErrorSerializer,
    apiOnErrorSideEffect,
    ApiResponse,
    apiSerializer,
    is307ErrorResponse,
} from 'admin/core';
import { getCurrentUserId } from './get-current-user-id.service';
import { getCurrentUserToken } from './get-current-user-token.service';
/* handlers */
import { apiRequestHandler } from 'shared/handlers';
import { triggerResetPasswordService } from './trigger-password-recovery.service';

export interface RefreshTokenDTO {
    token: string;
}

export const refreshTokenService = async (): Promise<ApiResponse<RefreshTokenDTO>> =>
    await apiRequestHandler<ApiResponse<RefreshTokenDTO>, FormData>({
        instance: AdminApiService,
        endpoint: `/auth/${getCurrentUserId()}/refresh-token`,
        token: getCurrentUserToken(),
        method: 'GET',
        responseSerializer: async data => apiSerializer<RefreshTokenDTO>(data),
        /* errorSerializer: async error => apiErrorSerializer<RefreshTokenDTO>(error), */
        errorSerializer: error =>
            apiOnErrorSideEffect<ApiResponse<RefreshTokenDTO>>(
                error,
                is307ErrorResponse,
                async () => {
                    triggerResetPasswordService();

                    return await apiErrorSerializer<RefreshTokenDTO>(error);
                },
                error => apiErrorSerializer<RefreshTokenDTO>(error)
            ),
    });
