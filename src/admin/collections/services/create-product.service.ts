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
    price: number;
    allowPrompts: boolean;
    /* file */
    includePicture: boolean;
    image?: File;
    /* collections */
    mainCollection: TitleRefCollection[];
    markAsAddon: boolean;
    secondaryCollection: TitleRefCollection[];
    multipleChoice: TitleRefCollection[];
    singleChoice: TitleRefCollection[];
}

export const createProductService = async (props: CreateProductProps): Promise<ApiResponse<{}>> => {
    const body = new FormData();

    body.append('defaultReference', props.defaultReference);
    body.append('defaultDescription', props.defaultDescription);
    body.append('multiLanguage', JSON.stringify(props.multiLanguage));

    body.append('referenceCollection', JSON.stringify(props.referenceCollection));
    body.append('descriptionCollection', JSON.stringify(props.descriptionCollection));

    body.append('price', JSON.stringify(props.price));

    body.append('allowPrompts', JSON.stringify(props.allowPrompts));

    body.append('includePicture', JSON.stringify(props.includePicture));

    if (props.image && props.includePicture) {
        body.append('image', props.image, 'image');
    }

    if (props.mainCollection.length > 0) {
        body.append('mainCollection', JSON.stringify(props.mainCollection));
    }

    body.append('markAsAddon', JSON.stringify(props.markAsAddon));

    if (props.markAsAddon && props.secondaryCollection.length > 0) {
        body.append('secondaryCollection', JSON.stringify(props.secondaryCollection));
    }

    if (props.multipleChoice.length > 0) {
        body.append('multipleChoice', JSON.stringify(props.multipleChoice));
    }

    if (props.singleChoice.length > 0) {
        body.append('singleChoice', JSON.stringify(props.singleChoice));
    }

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
