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

export interface UnlinkUserProps {
    commerceId: string;
    userId: string;
}

export const unlinkUserService = async (props: UnlinkUserProps): Promise<ApiResponse<{}>> => {
    return await apiRequestHandler<ApiResponse<{}>, UnlinkUserProps>({
        instance: AdminApiService,
        endpoint: '/account/unlinked',
        token: getCurrentUserToken(),
        method: 'PUT',
        body: props,
        responseSerializer: async data => apiSerializer<{}>(data),
        errorSerializer: error =>
            apiOnErrorSideEffect<ApiResponse<{}>>(
                error,
                is403ErrorResponse,
                async () =>
                    (await repeatRequestOnRefreshTokenService(() => unlinkUserService(props))) as ApiResponse<{}>,
                error => apiErrorSerializer<{}>(error)
            ),
    });
};
