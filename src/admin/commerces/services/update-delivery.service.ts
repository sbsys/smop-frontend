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
import { UpdateDeliveryForm } from '../views/CommerceDetailView/UpdateDeliveryModal';

interface UpdateDeliveryProps extends UpdateDeliveryForm {}

export const updateDeliveryService = async (
    commerceId: string,
    props: UpdateDeliveryProps
): Promise<ApiResponse<{}>> => {
    if (!props.externalDeliveryUrl) props.externalDeliveryUrl = '-';

    return await apiRequestHandler<ApiResponse<{}>>({
        instance: AdminApiService,
        endpoint: `/commerce/${commerceId}/delivery-settings`,
        token: getCurrentUserToken(),
        method: 'PUT',
        body: props,
        responseSerializer: async data => apiSerializer<{}>(data),
        errorSerializer: error =>
            apiOnErrorSideEffect<ApiResponse<{}>>(
                error,
                is403ErrorResponse,
                async () =>
                    (await repeatRequestOnRefreshTokenService(() =>
                        updateDeliveryService(commerceId, props)
                    )) as ApiResponse<{}>,
                error => apiErrorSerializer<{}>(error)
            ),
    });
};
