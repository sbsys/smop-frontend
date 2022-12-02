/* services */
import {
    AdminApiService,
    apiErrorSerializer,
    apiOnErrorSideEffect,
    ApiResponse,
    apiSerializer,
    is403ErrorResponse,
} from 'admin/core';
/* handlers */
import { apiRequestHandler } from 'shared/handlers';
/* utils */
import { getCurrentUserToken, repeatRequestOnRefreshTokenService } from 'admin/auth';
/* serializers */
import { menuMergeListSerializer } from '../serializers';
/* types */
import { MenuMergeDTO } from '../types';

interface MenuMergeListProps {}

export const menuMergeListService = async (
    commerceId: string,
    props?: MenuMergeListProps
): Promise<ApiResponse<MenuMergeDTO>> => {
    return await apiRequestHandler<ApiResponse<MenuMergeDTO>>({
        instance: AdminApiService,
        endpoint: `/shop/${commerceId}/props/menu-merge`,
        token: getCurrentUserToken(),
        method: 'GET',
        responseSerializer: async data => apiSerializer<MenuMergeDTO>(data, menuMergeListSerializer),
        errorSerializer: error =>
            apiOnErrorSideEffect<ApiResponse<MenuMergeDTO>>(
                error,
                is403ErrorResponse,
                async () =>
                    (await repeatRequestOnRefreshTokenService(() =>
                        menuMergeListService(commerceId, props)
                    )) as ApiResponse<MenuMergeDTO>,
                error => apiErrorSerializer<MenuMergeDTO>(error)
            ),
    });
};
