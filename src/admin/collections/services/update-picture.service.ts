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
/* handlers */
import { apiRequestHandler } from 'shared/handlers';

interface UpdatePictureProps {
    image: File;
}

export const updatePictureService = async (productId: string, props: UpdatePictureProps): Promise<ApiResponse<{}>> => {
    const body = new FormData();

    body.append('image', props.image, 'image');

    return await apiRequestHandler<ApiResponse<{}>, FormData>({
        instance: AdminApiService,
        endpoint: `/shop/product/${productId}/picture`,
        token: getCurrentUserToken(),
        method: 'PUT',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        body,
        responseSerializer: async data => apiSerializer<{}>(data),
        errorSerializer: error =>
            apiOnErrorSideEffect<ApiResponse<{}>>(
                error,
                is403ErrorResponse,
                async () =>
                    (await repeatRequestOnRefreshTokenService(() =>
                        updatePictureService(productId, props)
                    )) as ApiResponse<{}>,
                error => apiErrorSerializer<{}>(error)
            ),
    });
};
