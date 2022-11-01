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
import { productDetailSerializer } from '../serializers';
/* handlers */
import { apiRequestHandler } from 'shared/handlers';
/* types */
import { ProductDetailDTO } from '../types';

interface ProductDetailProps {
    productId: string;
}

export const productDetailService = async (props: ProductDetailProps): Promise<ApiResponse<ProductDetailDTO>> => {
    /* if (offline) return mock; */

    return await apiRequestHandler<ApiResponse<ProductDetailDTO>>({
        instance: AdminApiService,
        endpoint: `/shop/product/${props.productId}`,
        token: getCurrentUserToken(),
        method: 'GET',
        responseSerializer: async data => apiSerializer<ProductDetailDTO>(data, productDetailSerializer),
        errorSerializer: error =>
            apiOnErrorSideEffect<ApiResponse<ProductDetailDTO>>(
                error,
                is403ErrorResponse,
                async () =>
                    (await repeatRequestOnRefreshTokenService(() =>
                        productDetailService(props)
                    )) as ApiResponse<ProductDetailDTO>,
                error => apiErrorSerializer<ProductDetailDTO>(error)
            ),
    });
};
