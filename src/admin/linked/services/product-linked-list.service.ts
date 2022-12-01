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
/* serializers */
import { productLinkedListSerializer } from '../serializers';
/* handlers */
import { apiRequestHandler } from 'shared/handlers';
/* types */
import { LinkedMenuProduct } from '../types';

interface ProductLinkedListProps {}

export const productLinkedListService = async (
    commerceId: string,
    titleId: number,
    props?: ProductLinkedListProps
): Promise<ApiResponse<LinkedMenuProduct[]>> => {
    return await apiRequestHandler<ApiResponse<LinkedMenuProduct[]>>({
        instance: AdminApiService,
        endpoint: `/shop/${commerceId}/menu/${titleId}/product`,
        method: 'GET',
        token: getCurrentUserToken(),
        responseSerializer: async data => apiSerializer<LinkedMenuProduct[]>(data, productLinkedListSerializer),
        errorSerializer: error =>
            apiOnErrorSideEffect<ApiResponse<LinkedMenuProduct[]>>(
                error,
                is403ErrorResponse,
                async () =>
                    (await repeatRequestOnRefreshTokenService(() =>
                        productLinkedListService(commerceId, titleId, props)
                    )) as ApiResponse<LinkedMenuProduct[]>,
                error => apiErrorSerializer<LinkedMenuProduct[]>(error)
            ),
    });
};
