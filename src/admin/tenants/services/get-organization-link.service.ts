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
/* serializers */
/* handlers */
import { apiRequestHandler } from 'shared/handlers';
/* types */

interface GetOrganizationLinkProps {}

export const getOrganizationLinkService = async (props?: GetOrganizationLinkProps): Promise<ApiResponse<string>> => {
    return await apiRequestHandler<ApiResponse<string>>({
        instance: AdminApiService,
        endpoint: '/org/generate-link',
        token: getCurrentUserToken(),
        method: 'GET',
        responseSerializer: async data =>
            apiSerializer<string>(data, data => {
                return data.addressKey ?? '';
            }),
        errorSerializer: error =>
            apiOnErrorSideEffect<ApiResponse<string>>(
                error,
                is403ErrorResponse,
                async () =>
                    (await repeatRequestOnRefreshTokenService(() =>
                        getOrganizationLinkService(props)
                    )) as ApiResponse<string>,
                error => apiErrorSerializer<string>(error)
            ),
    });
};
