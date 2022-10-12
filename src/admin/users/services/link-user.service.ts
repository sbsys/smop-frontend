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

export interface LinkUserProps {
    profileId: number;
    commerceId: string;
    userId: string;
}

export const linkUserService = async (isUpdate: boolean, props: LinkUserProps): Promise<ApiResponse<{}>> => {
    return await apiRequestHandler<ApiResponse<{}>, LinkUserProps>({
        instance: AdminApiService,
        endpoint: '/account/link',
        token: getCurrentUserToken(),
        method: isUpdate ? 'PUT' : 'POST',
        body: props,
        responseSerializer: async data => apiSerializer<{}>(data),
        errorSerializer: error =>
            apiOnErrorSideEffect<ApiResponse<{}>>(
                error,
                is403ErrorResponse,
                async () =>
                    (await repeatRequestOnRefreshTokenService(() =>
                        linkUserService(isUpdate, props)
                    )) as ApiResponse<{}>,
                error => apiErrorSerializer<{}>(error)
            ),
    });
};
