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
/* types */
import { TitleRefCollection } from '../types';

interface UpdateCollectionServiceProps {
    mainCollection: TitleRefCollection[];
    markAsAddon: boolean;
    accesoryCollection: TitleRefCollection[];
}

export const updateCollectionService = async (
    productId: string,
    props: UpdateCollectionServiceProps
): Promise<ApiResponse<{}>> => {
    return await apiRequestHandler<ApiResponse<{}>>({
        instance: AdminApiService,
        endpoint: `/shop/product/${productId}/collection`,
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
                        updateCollectionService(productId, props)
                    )) as ApiResponse<{}>,
                error => apiErrorSerializer<{}>(error)
            ),
    });
};
