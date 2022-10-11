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
import { UpdateReferenceForm } from '../views/CommerceDetailView/UpdateReferenceModal/useUpdateReference.hook';

interface UpdateReferenceProps extends UpdateReferenceForm {}

export const updateReferenceService = async (
    commerceId: string,
    props: UpdateReferenceProps
): Promise<ApiResponse<{}>> => {
    if (!props.optionalAddress) props.optionalAddress = '-';

    return await apiRequestHandler<ApiResponse<{}>>({
        instance: AdminApiService,
        endpoint: `/commerce/${commerceId}/references`,
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
                        updateReferenceService(commerceId, props)
                    )) as ApiResponse<{}>,
                error => apiErrorSerializer<{}>(error)
            ),
    });
};
