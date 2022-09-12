/* services */
import { AdminApiService, apiErrorSerializer, ApiResponse, apiSerializer } from 'admin/core';
import { getCurrentUserId } from './get-current-user-id.service';
import { getCurrentUserToken } from './get-current-user-token.service';
/* handlers */
import { apiRequestHandler } from 'shared/handlers';

export interface RefreshTokenDTO {
    token: string;
}

export const refreshTokenService = async (): Promise<ApiResponse<RefreshTokenDTO>> =>
    await apiRequestHandler<ApiResponse<RefreshTokenDTO>, FormData>({
        instance: AdminApiService,
        endpoint: `/auth/${getCurrentUserId()}/refresh-token`,
        token: getCurrentUserToken(),
        method: 'POST',
        responseSerializer: async data => apiSerializer<RefreshTokenDTO>(data),
        errorSerializer: async error => apiErrorSerializer<RefreshTokenDTO>(error),
    });
