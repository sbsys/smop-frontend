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

interface UpdateAddonTitleProps {
    defaultTitle: string;
    titleCollection: TitleCollection[];
    multiLanguage: boolean;
    isActive: boolean;
}

export const updateAddonTitleService = async (
    titleId: number,
    props: UpdateAddonTitleProps
): Promise<ApiResponse<{}>> => {
    /* const body = new FormData();

    (Object.keys(props) as (keyof UpdateAddonTitleProps)[]).forEach(key => body.append(key, JSON.stringify(props[key]))); */

    return await apiRequestHandler<ApiResponse<{}>>({
        instance: AdminApiService,
        endpoint: `/shop/accesory-title/${titleId}`,
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
                        updateAddonTitleService(titleId, props)
                    )) as ApiResponse<{}>,
                error => apiErrorSerializer<{}>(error)
            ),
    });
};
