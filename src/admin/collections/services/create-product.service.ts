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
import { TitleCollection, TitleRefCollection } from '../types';

interface CreateProductProps {
    /* references */
    defaultReference: string;
    defaultDescription: string;
    multiLanguage: boolean;
    referenceCollection: TitleCollection[];
    descriptionCollection: TitleCollection[];
    allowPrompts: boolean;
    /* file */
    includePicture: boolean;
    image?: File;
    /* collections */
    mainCollection: TitleRefCollection[];
    accesoryCollection: TitleRefCollection[];
    multipleChoice: TitleRefCollection[];
    singleChoice: TitleRefCollection[];
}

export const createProductService = async (props: CreateProductProps): Promise<ApiResponse<{}>> => {
    const body = new FormData();

    (Object.keys(props) as (keyof Omit<CreateProductProps, 'image'>)[]).forEach(key =>
        body.append(key, JSON.stringify(props[key]))
    );

    if (props.image) body.append('image', props.image, 'image');

    return await apiRequestHandler<ApiResponse<{}>, FormData>({
        instance: AdminApiService,
        endpoint: '/shop/product',
        token: getCurrentUserToken(),
        method: 'POST',
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
                    (await repeatRequestOnRefreshTokenService(() => createProductService(props))) as ApiResponse<{}>,
                error => apiErrorSerializer<{}>(error)
            ),
    });
};
