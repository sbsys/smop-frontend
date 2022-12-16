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
import { commerceDetailSerializer } from '../serializers';
/* handlers */
import { apiRequestHandler } from 'shared/handlers';
/* types */
import { CommerceDetailDTO } from '../types';

interface CommerceDetailProps {
    commerceId: string;
}

export const commerceDetailService = async (props: CommerceDetailProps): Promise<ApiResponse<CommerceDetailDTO>> => {
    return await apiRequestHandler<ApiResponse<CommerceDetailDTO>>({
        instance: AdminApiService,
        endpoint: `/commerce/${props.commerceId}`,
        token: getCurrentUserToken(),
        method: 'GET',
        responseSerializer: async data => apiSerializer<CommerceDetailDTO>(data, commerceDetailSerializer),
        errorSerializer: error =>
            apiOnErrorSideEffect<ApiResponse<CommerceDetailDTO>>(
                error,
                is403ErrorResponse,
                async () =>
                    (await repeatRequestOnRefreshTokenService(() =>
                        commerceDetailService(props)
                    )) as ApiResponse<CommerceDetailDTO>,
                error => apiErrorSerializer<CommerceDetailDTO>(error)
            ),
    });
};
