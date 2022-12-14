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
import { productListSerializer } from '../serializers';
/* handlers */
import { apiRequestHandler } from 'shared/handlers';
/* types */
import { ProductListItemDTO } from '../types';

interface ProductListProps {}

export const productListService = async (props?: ProductListProps): Promise<ApiResponse<ProductListItemDTO[]>> => {
    /* const body = new FormData();

    (Object.keys(props) as (keyof ProductListProps)[]).forEach(key => body.append(key, props[key])); */

    return await apiRequestHandler<ApiResponse<ProductListItemDTO[]>>({
        instance: AdminApiService,
        endpoint: '/shop/product',
        token: getCurrentUserToken(),
        method: 'GET',
        responseSerializer: async data => apiSerializer<ProductListItemDTO[]>(data, productListSerializer),
        errorSerializer: error =>
            apiOnErrorSideEffect<ApiResponse<ProductListItemDTO[]>>(
                error,
                is403ErrorResponse,
                async () =>
                    (await repeatRequestOnRefreshTokenService(() => productListService(props))) as ApiResponse<
                        ProductListItemDTO[]
                    >,
                error => apiErrorSerializer<ProductListItemDTO[]>(error)
            ),
    });
};
