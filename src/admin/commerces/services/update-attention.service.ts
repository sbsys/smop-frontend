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
import { UpdateAttentionForm } from '../views/CommerceDetailView/UpdateAttentionModal';

interface UpdateAttentionProps extends UpdateAttentionForm {}

export const updateAttentionService = async (
    commerceId: string,
    props: UpdateAttentionProps
): Promise<ApiResponse<{}>> => {
    props.onsitePreparationTime = {
        hours: Number.parseInt(`${props.onsitePreparationTime.hours}` || '0'),
        minutes: Number.parseInt(`${props.onsitePreparationTime.minutes}` || '0'),
    };
    props.deliveryPreparationTime = {
        hours: Number.parseInt(`${props.deliveryPreparationTime.hours}` || '0'),
        minutes: Number.parseInt(`${props.deliveryPreparationTime.minutes}` || '0'),
    };

    return await apiRequestHandler<ApiResponse<{}>>({
        instance: AdminApiService,
        endpoint: `/commerce/${commerceId}/service-hours`,
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
                        updateAttentionService(commerceId, props)
                    )) as ApiResponse<{}>,
                error => apiErrorSerializer<{}>(error)
            ),
    });
};
