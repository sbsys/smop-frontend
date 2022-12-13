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
import { complementTitleListSerializer } from '../serializers';
/* handlers */
import { apiRequestHandler } from 'shared/handlers';
/* types */
import { ComplementTitleListItemDTO } from '../types';

interface AddonsTitleListProps {}

export const addonsTitleListService = async (
    props?: AddonsTitleListProps
): Promise<ApiResponse<ComplementTitleListItemDTO[]>> => {
    /* const body = new FormData();

    (Object.keys(props) as (keyof AddonsTitleListProps)[]).forEach(key => body.append(key, props[key])); */

    return await apiRequestHandler<ApiResponse<ComplementTitleListItemDTO[]>>({
        instance: AdminApiService,
        endpoint: '/shop/complement-title',
        token: getCurrentUserToken(),
        method: 'GET',
        responseSerializer: async data =>
            apiSerializer<ComplementTitleListItemDTO[]>(data, complementTitleListSerializer),
        errorSerializer: error =>
            apiOnErrorSideEffect<ApiResponse<ComplementTitleListItemDTO[]>>(
                error,
                is403ErrorResponse,
                async () =>
                    (await repeatRequestOnRefreshTokenService(() => addonsTitleListService(props))) as ApiResponse<
                        ComplementTitleListItemDTO[]
                    >,
                error => apiErrorSerializer<ComplementTitleListItemDTO[]>(error)
            ),
    });
};
