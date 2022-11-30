/* services */
import {
    AdminApiService,
    apiErrorSerializer,
    apiOnErrorSideEffect,
    ApiResponse,
    apiSerializer,
    is403ErrorResponse,
    offline,
} from 'admin/core';
import { getCurrentUserToken, repeatRequestOnRefreshTokenService } from 'admin/auth';
/* serializers */
import { productListSerializer } from '../serializers';
/* handlers */
import { apiRequestHandler } from 'shared/handlers';
/* utils */
import { parse } from 'date-fns';
/* types */
import { ProductListItemDTO } from '../types';

interface ProductListProps {}

const mock: ApiResponse<ProductListItemDTO[]> = {
    error: false,
    message: 'Product list',
    data: [
        {
            productId: '1',
            defaultReference: 'Churrasco',
            markAsAddon: false,
            isActive: 'active',
            createdAt: parse('2022-08-29', 'yyyy-MM-dd', Date.now()),
            url: 'https://www.goya.com/media/7017/churrasco-con-chimichurri-grilled-skirt-steak.jpg',
            price: '12.0000',
        },
        {
            productId: '2',
            defaultReference: 'Tomate rodaja',
            markAsAddon: true,
            isActive: 'active',
            createdAt: parse('2022-08-30', 'yyyy-MM-dd', Date.now()),
            url: 'https://images.freeimages.com/images/large-previews/922/tomates-sliced-1-1315997.jpg',
            price: '12.0000',
        },
        {
            productId: '3',
            defaultReference: 'Tomate a cuadros',
            markAsAddon: true,
            isActive: 'inactive',
            createdAt: parse('2022-08-31', 'yyyy-MM-dd', Date.now()),
            url: 'https://www.codigococina.com/wp-content/uploads/2016/11/tomate_concasse_corte-1.jpg',
            price: '12.0000',
        },
    ],
};

export const productListService = async (props?: ProductListProps): Promise<ApiResponse<ProductListItemDTO[]>> => {
    if (offline) return mock;
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
