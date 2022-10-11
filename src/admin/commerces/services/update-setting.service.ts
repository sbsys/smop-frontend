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
import { UpdateSettingForm } from '../views/CommerceDetailView/UpdateSettingModal';

interface UpdateSettingProps extends UpdateSettingForm {}

export const updateSettingService = async (commerceId: string, props: UpdateSettingProps): Promise<ApiResponse<{}>> => {
    props.typeCharge[0].value = Number.parseInt(`${props.typeCharge[0].value}` || '0');
    props.typeCharge[1].value = Number.parseInt(`${props.typeCharge[1].value}` || '0');

    return await apiRequestHandler<ApiResponse<{}>>({
        instance: AdminApiService,
        endpoint: `/commerce/${commerceId}/global-settings`,
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
                        updateSettingService(commerceId, props)
                    )) as ApiResponse<{}>,
                error => apiErrorSerializer<{}>(error)
            ),
    });
};
