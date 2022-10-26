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
}

export const updateMainTitleService = async (
    titleId: number,
    props: UpdateMainTitleProps
): Promise<ApiResponse<{}>> => {
    /* const body = new FormData();

    (Object.keys(props) as (keyof UpdateMainTitleProps)[]).forEach(key => body.append(key, JSON.stringify(props[key]))); */

    return await apiRequestHandler<ApiResponse<{}>>({
        instance: AdminApiService,
        endpoint: `/shop/main-title/${titleId}`,
        token: getCurrentUserToken(),
        method: 'PUT',
        body: props,
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
