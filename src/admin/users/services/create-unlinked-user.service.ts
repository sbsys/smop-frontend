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

interface CreateUnlinkedUserProps {
    fullname: string;
    phoneNumber: string;
    email: string;
    password: string;
}

export const createUnlinkedUserService = async (props: CreateUnlinkedUserProps): Promise<ApiResponse<{}>> => {
    return await apiRequestHandler<ApiResponse<{}>, CreateUnlinkedUserProps>({
        instance: AdminApiService,
        endpoint: '/account/create-unlinked',
        token: getCurrentUserToken(),
        method: 'POST',
        body: props,
        responseSerializer: async data => apiSerializer<{}>(data),
        errorSerializer: error =>
            apiOnErrorSideEffect<ApiResponse<{}>>(
                error,
                is403ErrorResponse,
                async () =>
                    (await repeatRequestOnRefreshTokenService(() =>
                        createUnlinkedUserService(props)
                    )) as ApiResponse<{}>,
                error => apiErrorSerializer<{}>(error)
            ),
    });
};
