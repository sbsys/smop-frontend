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

interface LinkProductListProps {
    productCollection: LinkProduct[];
}

export const linkProductListService = async (
    commerceId: string,
    props: LinkProductListProps
): Promise<ApiResponse<{}>> => {
    return await apiRequestHandler<ApiResponse<{}>>({
        instance: AdminApiService,
        endpoint: `/shop/${commerceId}/menu/product`,
        method: 'POST',
        token: getCurrentUserToken(),
        body: props,
        responseSerializer: async data => apiSerializer<{}>(data),
        errorSerializer: error =>
            apiOnErrorSideEffect<ApiResponse<{}>>(
                error,
                is403ErrorResponse,
                async () =>
                    (await repeatRequestOnRefreshTokenService(() =>
                        linkProductListService(commerceId, props)
                    )) as ApiResponse<{}>,
                error => apiErrorSerializer<{}>(error)
            ),
    });
};
