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

interface BrandingProps {
    cover: File;
    profile: File;
}
interface UpdateBrandingProps {
    orgId: string;
    branding: BrandingProps;
}

export interface UpdateBrandingResponse {}

export const updateBrandingService = async (
    props: UpdateBrandingProps
): Promise<ApiResponse<UpdateBrandingResponse>> => {
    const body = new FormData();

    (Object.keys(props.branding) as (keyof BrandingProps)[]).forEach(key => body.append(key, props.branding[key], key));

    return await apiRequestHandler<ApiResponse<UpdateBrandingResponse>, FormData>({
        instance: AdminApiService,
        endpoint: `/org/${props.orgId}/brand`,
        token: getCurrentUserToken(),
        method: 'PUT',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        body,
        responseSerializer: async data => apiSerializer<UpdateBrandingResponse>(data),
        errorSerializer: error =>
            apiOnErrorSideEffect<ApiResponse<UpdateBrandingResponse>>(
                error,
                is403ErrorResponse,
                async () =>
                    (await repeatRequestOnRefreshTokenService(() =>
                        updateBrandingService(props)
                    )) as ApiResponse<UpdateBrandingResponse>,
                error => apiErrorSerializer<UpdateBrandingResponse>(error)
            ),
    });
};
