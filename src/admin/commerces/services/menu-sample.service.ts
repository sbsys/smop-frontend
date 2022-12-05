/* services */
import {
    AdminApiService,
    apiErrorSerializer,
    apiOnErrorSideEffect,
    ApiResponse,
    apiSerializer,
    is403ErrorResponse,
} from 'admin/core';
/* handlers */
import { apiRequestHandler } from 'shared/handlers';
/* utils */
import { getCurrentUserToken, repeatRequestOnRefreshTokenService } from 'admin/auth';
/* serializers */
import {} from '../serializers';
/* types */

interface MenuSampleProps {}

export const menuSampleService = async (commerceId: string, props?: MenuSampleProps): Promise<ApiResponse<{}>> => {
    return await apiRequestHandler<ApiResponse<{}>>({
        instance: AdminApiService,
        endpoint: `/shop/${commerceId}/menu/sample`,
        token: getCurrentUserToken(),
        method: 'GET',
        responseSerializer: async data =>
            apiSerializer<{}>(data, data => {
                console.log('MENUSAMPLE', data);
                return {};
            }),
        errorSerializer: error =>
            apiOnErrorSideEffect<ApiResponse<{}>>(
                error,
                is403ErrorResponse,
                async () =>
                    (await repeatRequestOnRefreshTokenService(() =>
                        menuSampleService(commerceId, props)
                    )) as ApiResponse<{}>,
                error => apiErrorSerializer<{}>(error)
            ),
    });
};
