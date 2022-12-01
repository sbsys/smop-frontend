/* services */
import { getCurrentUserToken, repeatRequestOnRefreshTokenService } from 'admin/auth';
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
/* types */
import { LinkProduct } from '../types';

interface UpdateLinkedProductListProps {
    collection: LinkProduct[];
}

export const updateLinkedProductListService = async (
    commerceId: string,
    titleId: number,
    props: UpdateLinkedProductListProps
): Promise<ApiResponse<{}>> => {
    return await apiRequestHandler<ApiResponse<{}>>({
        instance: AdminApiService,
        endpoint: `/shop/${commerceId}/menu/title/${titleId}`,
        method: 'PUT',
        token: getCurrentUserToken(),
        body: props,
        responseSerializer: async data => apiSerializer<{}>(data),
        errorSerializer: error =>
            apiOnErrorSideEffect<ApiResponse<{}>>(
                error,
                is403ErrorResponse,
                async () =>
                    (await repeatRequestOnRefreshTokenService(() =>
                        updateLinkedProductListService(commerceId, titleId, props)
                    )) as ApiResponse<{}>,
                error => apiErrorSerializer<{}>(error)
            ),
    });
};
