/* services */
import { getCurrentUserToken, repeatRequestOnRefreshTokenService } from 'admin/auth';
import {
    AdminApiService,
    apiErrorSerializer,
    apiOnErrorSideEffect,
    ApiResponse,
    apiSerializer,
    is403ErrorResponse,
} from 'admin/core';
/* serializers */
import { menuNotLinkedListSerializer } from '../serializers';
/* handlers */
import { apiRequestHandler } from 'shared/handlers';
/* types */
import { MenuNotLinkedListItemDTO } from '../types';

interface MenuNotLinkedListProps {}

export const menuNotLinkedListService = async (
    commerceId: string,
    props?: MenuNotLinkedListProps
): Promise<ApiResponse<MenuNotLinkedListItemDTO[]>> => {
    return await apiRequestHandler<ApiResponse<MenuNotLinkedListItemDTO[]>, FormData>({
        instance: AdminApiService,
        endpoint: `/shop/${commerceId}/menu/not-linked`,
        method: 'GET',
        token: getCurrentUserToken(),
        responseSerializer: async data => apiSerializer<MenuNotLinkedListItemDTO[]>(data, menuNotLinkedListSerializer),
        errorSerializer: error =>
            apiOnErrorSideEffect<ApiResponse<MenuNotLinkedListItemDTO[]>>(
                error,
                is403ErrorResponse,
                async () =>
                    (await repeatRequestOnRefreshTokenService(() =>
                        menuNotLinkedListService(commerceId, props)
                    )) as ApiResponse<MenuNotLinkedListItemDTO[]>,
                error => apiErrorSerializer<MenuNotLinkedListItemDTO[]>(error)
            ),
    });
};
