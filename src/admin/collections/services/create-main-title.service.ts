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

interface CreateMainTitleProps {
    defaultTitle: string;
    titleCollection: TitleCollection[];
    multiLanguage: boolean;
    serviceMode: number;
    servedOn: string;
}

export const createMainTitleService = async (props: CreateMainTitleProps): Promise<ApiResponse<{}>> => {
    /* const body = new FormData();

    (Object.keys(props) as (keyof CreateMainTitleProps)[]).forEach(key => body.append(key, JSON.stringify(props[key]))); */

    return await apiRequestHandler<ApiResponse<{}>>({
        instance: AdminApiService,
        endpoint: '/shop/main-title',
        token: getCurrentUserToken(),
        method: 'POST',
        body: props,
        responseSerializer: async data => apiSerializer<{}>(data),
        errorSerializer: error =>
            apiOnErrorSideEffect<ApiResponse<{}>>(
                error,
                is403ErrorResponse,
                async () =>
                    (await repeatRequestOnRefreshTokenService(() => createMainTitleService(props))) as ApiResponse<{}>,
                error => apiErrorSerializer<{}>(error)
            ),
    });
};
