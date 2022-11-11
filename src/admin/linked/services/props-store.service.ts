/* services */
import { getCurrentUserToken, repeatRequestOnRefreshTokenService } from 'admin/auth';
import {
    AdminApiService,
    apiErrorSerializer,
    apiOnErrorSideEffect,
    ApiResponse,
    apiSerializer,
    is403ErrorResponse,
} from 'admin/core';
/* serializers */
import { propsStoreSerializer } from '../serializers';
/* handlers */
import { apiRequestHandler } from 'shared/handlers';
/* types */
import { LinkedCommerceSettingsDTO } from '../types';

interface PropsStoreProps {}

export const propsStoreService = async (props?: PropsStoreProps): Promise<ApiResponse<LinkedCommerceSettingsDTO>> => {
    return await apiRequestHandler<ApiResponse<LinkedCommerceSettingsDTO>, FormData>({
        instance: AdminApiService,
        endpoint: '/shop/props/store',
        method: 'GET',
        token: getCurrentUserToken(),
        responseSerializer: async data => apiSerializer<LinkedCommerceSettingsDTO>(data, propsStoreSerializer),
        errorSerializer: error =>
            apiOnErrorSideEffect<ApiResponse<LinkedCommerceSettingsDTO>>(
                error,
                is403ErrorResponse,
                async () =>
                    (await repeatRequestOnRefreshTokenService(() =>
                        propsStoreService(props)
                    )) as ApiResponse<LinkedCommerceSettingsDTO>,
                error => apiErrorSerializer<LinkedCommerceSettingsDTO>(error)
            ),
    });
};
