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
import { gatewayListSerializer } from '../serializers';
/* handlers */
import { apiRequestHandler } from 'shared/handlers';
/* types */
import { GatewayListItem } from '../types';

interface GatewayListProps {}

export const gatewayListService = async (props?: GatewayListProps): Promise<ApiResponse<GatewayListItem[]>> => {
    return await apiRequestHandler({
        instance: AdminApiService,
        endpoint: '/org/payment-gateway',
        token: getCurrentUserToken(),
        method: 'GET',
        responseSerializer: async data => apiSerializer(data, gatewayListSerializer),
        errorSerializer: error =>
            apiOnErrorSideEffect(
                error,
                is403ErrorResponse,
                async () =>
                    (await repeatRequestOnRefreshTokenService(() => gatewayListService(props))) as ApiResponse<
                        GatewayListItem[]
                    >,
                error => apiErrorSerializer(error)
            ),
    });
};
