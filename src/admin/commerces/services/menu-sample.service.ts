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
import { menuSampleSerializer } from '../serializers';
/* types */
import { MenuTitleListItemDTO } from '../types';

interface MenuSampleProps {}

export const menuSampleService = async (
    commerceId: string,
    props?: MenuSampleProps
): Promise<ApiResponse<MenuTitleListItemDTO[]>> => {
    return await apiRequestHandler<ApiResponse<MenuTitleListItemDTO[]>>({
        instance: AdminApiService,
        endpoint: `/shop/${commerceId}/menu/sample`,
        token: getCurrentUserToken(),
        method: 'GET',
        responseSerializer: async data => apiSerializer<MenuTitleListItemDTO[]>(data, menuSampleSerializer),
        errorSerializer: error =>
            apiOnErrorSideEffect<ApiResponse<MenuTitleListItemDTO[]>>(
                error,
                is403ErrorResponse,
                async () =>
                    (await repeatRequestOnRefreshTokenService(() =>
                        menuSampleService(commerceId, props)
                    )) as ApiResponse<MenuTitleListItemDTO[]>,
                error => apiErrorSerializer<MenuTitleListItemDTO[]>(error)
            ),
    });
};
