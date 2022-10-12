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

interface CreateLinkedUserProps {
    fullname: string;
    phoneNumber: string;
    email: string;
    password: string;
    profileId: number;
    commerceId: string;
}

export const createLinkedUserService = async (props: CreateLinkedUserProps): Promise<ApiResponse<{}>> => {
    return await apiRequestHandler<ApiResponse<{}>, CreateLinkedUserProps>({
        instance: AdminApiService,
        endpoint: '/account/create-linked',
        token: getCurrentUserToken(),
        method: 'POST',
        body: props,
        responseSerializer: async data => apiSerializer<{}>(data),
        errorSerializer: error =>
            apiOnErrorSideEffect<ApiResponse<{}>>(
                error,
                is403ErrorResponse,
                async () =>
                    (await repeatRequestOnRefreshTokenService(() => createLinkedUserService(props))) as ApiResponse<{}>,
                error => apiErrorSerializer<{}>(error)
            ),
    });
};
