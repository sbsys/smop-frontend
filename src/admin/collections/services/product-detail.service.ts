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
import { productDetailSerializer } from '../serializers';
/* handlers */
import { apiRequestHandler } from 'shared/handlers';
/* types */
import { ProductDetailDTO } from '../types';

interface ProductDetailProps {
    productId: string;
}

const mock: ApiResponse<ProductDetailDTO> = {
    error: false,
    message: 'Product detail',
    data: {
        productId: '8513f821-a689-4fa9-a74d-8ffcfb6a4277',
        defaultReference: 'Moon cheese 25gr',
        defaultDescription: 'Moon cheese 25gr description',
        multiLanguage: true,
        referenceCollection: [
            {
                ref: 'Moon cheese 25gr',
                lang: 'en',
            },
            {
                ref: 'Queso lunar 25gr',
                lang: 'es',
            },
        ],
        descriptionCollection: [
            {
                ref: 'Moon cheese 25gr description',
                lang: 'en',
            },
            {
                ref: 'Descripción queso lunar 25gr',
                lang: 'es',
            },
        ],
        allowPrompts: true,
        url: 'http://a3e7-2803-2d60-1104-2d9-bd7a-42c0-a200-afae.ngrok.io/smop/api/v1/file/e46072ce2db67570d34b020dfebb2f248cb6793b46316b6e86c3dc606469ed73dc31bb9520ec888660362e27616fb244251157f4d504f44471d6521e615a013313ae466fc7cccc1d9ca496a42c4ebaa6b4f969c619f8bb7e1190465ee79f2f277c22c45f1f9341a1971f90c9dc781120',
        mainCollection: [
            {
                titleId: 8,
            },
        ],
        markAsAddon: true,
        accesoryCollection: [
            {
                titleId: 3,
            },
        ],
        multipleChoice: [
            {
                titleId: 3,
            },
            {
                titleId: 2,
            },
        ],
        singleChoice: [
            {
                titleId: 1,
            },
        ],
        feature: {
            measure: {
                measureId: 6,
                measure: '500',
                unit: 'g',
            },
            presentation: {
                presentationId: 12,
                defaultDescription: 'Medium packaging',
            },
        },
        createdAt: new Date('2022-11-01T21:37:45.972Z'),
        isActive: 'active',
        isAvailable: true,
        price: '12.0000',
    },
};

export const productDetailService = async (props: ProductDetailProps): Promise<ApiResponse<ProductDetailDTO>> => {
    if (offline) return mock;

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
