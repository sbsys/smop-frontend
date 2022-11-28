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
import { TitleCollection } from '../types';

interface UpdateMainTitleProps {
    defaultTitle: string;
    titleCollection: TitleCollection[];
    multiLanguage: boolean;
    serviceMode: number;
    servedOn: string;
    isActive: boolean;
    image: File;
}

export const updateMainTitleService = async (
    titleId: number,
    props: UpdateMainTitleProps
): Promise<ApiResponse<{}>> => {
    const body = new FormData();

    (Object.keys(props) as (keyof UpdateMainTitleProps)[]).forEach(key => {
        if (key === 'image') body.append(key, props[key], key);
        else body.append(key, JSON.stringify(props[key]));
    });

    return await apiRequestHandler<ApiResponse<{}>, FormData>({
        instance: AdminApiService,
        endpoint: `/shop/main-title/${titleId}`,
        token: getCurrentUserToken(),
        method: 'PUT',
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
                    (await repeatRequestOnRefreshTokenService(() =>
                        updateMainTitleService(titleId, props)
                    )) as ApiResponse<{}>,
                error => apiErrorSerializer<{}>(error)
            ),
    });
};
