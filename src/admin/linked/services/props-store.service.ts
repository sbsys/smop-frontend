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
import { LinkedCommerceSettings } from '../types';

interface PropsStoreProps {}

export const propsStoreService = async (props?: PropsStoreProps): Promise<ApiResponse<LinkedCommerceSettings>> => {
    return await apiRequestHandler<ApiResponse<LinkedCommerceSettings>, FormData>({
        instance: AdminApiService,
        endpoint: '/shop/props/store',
        method: 'GET',
        token: getCurrentUserToken(),
        responseSerializer: async data => apiSerializer<LinkedCommerceSettings>(data, propsStoreSerializer),
        errorSerializer: error =>
            apiOnErrorSideEffect<ApiResponse<LinkedCommerceSettings>>(
                error,
                is403ErrorResponse,
                async () =>
                    (await repeatRequestOnRefreshTokenService(() =>
                        propsStoreService(props)
                    )) as ApiResponse<LinkedCommerceSettings>,
                error => apiErrorSerializer<LinkedCommerceSettings>(error)
            ),
    });
};
