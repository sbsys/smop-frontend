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

interface ReferenceProps {
    organizationName: string;
    ownerReference: string;
}
interface UpdateReferenceProps {
    orgId: string;
    reference: ReferenceProps;
}

export interface UpdateReferenceResponse {}

export const updateReferenceService = async (
    props: UpdateReferenceProps
): Promise<ApiResponse<UpdateReferenceResponse>> => {
    const body = new FormData();

    (Object.keys(props.reference) as (keyof ReferenceProps)[]).forEach(key => body.append(key, props.reference[key]));

    return await apiRequestHandler<ApiResponse<UpdateReferenceResponse>, FormData>({
        instance: AdminApiService,
        endpoint: `/maintenance/org/${props.orgId}/references`,
        token: getCurrentUserToken(),
        method: 'PUT',
        body,
        responseSerializer: async data => apiSerializer<UpdateReferenceResponse>(data),
        errorSerializer: error =>
            apiOnErrorSideEffect<ApiResponse<UpdateReferenceResponse>>(
                error,
                is403ErrorResponse,
                async () =>
                    (await repeatRequestOnRefreshTokenService(() =>
                        updateReferenceService(props)
                    )) as ApiResponse<UpdateReferenceResponse>,
                error => apiErrorSerializer<UpdateReferenceResponse>(error)
            ),
    });
};
