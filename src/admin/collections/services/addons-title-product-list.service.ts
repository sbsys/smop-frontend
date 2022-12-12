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
import { titleProductListSerializer } from '../serializers';
/* handlers */
import { apiRequestHandler } from 'shared/handlers';
/* types */
import { TitleProductListItemDTO } from '../types';

interface AddonsTitleProductListProps {}

export const addonsTitleProductListService = async (
    titleId: number,
    props?: AddonsTitleProductListProps
): Promise<ApiResponse<TitleProductListItemDTO[]>> => {
    /* const body = new FormData();

    (Object.keys(props) as (keyof MainTitleProductListProps)[]).forEach(key => body.append(key, props[key])); */

    return await apiRequestHandler<ApiResponse<TitleProductListItemDTO[]>>({
        instance: AdminApiService,
        endpoint: `/shop/complement-title/${titleId}/product`,
        token: getCurrentUserToken(),
        method: 'GET',
        responseSerializer: async data => apiSerializer<TitleProductListItemDTO[]>(data, titleProductListSerializer),
        errorSerializer: error =>
            apiOnErrorSideEffect<ApiResponse<TitleProductListItemDTO[]>>(
                error,
                is403ErrorResponse,
                async () =>
                    (await repeatRequestOnRefreshTokenService(() =>
                        addonsTitleProductListService(titleId, props)
                    )) as ApiResponse<TitleProductListItemDTO[]>,
                error => apiErrorSerializer<TitleProductListItemDTO[]>(error)
            ),
    });
};
