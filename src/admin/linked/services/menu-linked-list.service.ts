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
import { menuLinkedListSerializer } from '../serializers';
/* handlers */
import { apiRequestHandler } from 'shared/handlers';
/* types */
import { MenuLinkedListItemDTO } from '../types';

interface MenuLinkedListProps {}

export const menuLinkedListService = async (
    commerceId: string,
    props?: MenuLinkedListProps
): Promise<ApiResponse<MenuLinkedListItemDTO[]>> => {
    return await apiRequestHandler<ApiResponse<MenuLinkedListItemDTO[]>, FormData>({
        instance: AdminApiService,
        endpoint: `/shop/${commerceId}/menu`,
        method: 'GET',
        token: getCurrentUserToken(),
        responseSerializer: async data => apiSerializer<MenuLinkedListItemDTO[]>(data, menuLinkedListSerializer),
        errorSerializer: error =>
            apiOnErrorSideEffect<ApiResponse<MenuLinkedListItemDTO[]>>(
                error,
                is403ErrorResponse,
                async () =>
                    (await repeatRequestOnRefreshTokenService(() =>
                        menuLinkedListService(commerceId, props)
                    )) as ApiResponse<MenuLinkedListItemDTO[]>,
                error => apiErrorSerializer<MenuLinkedListItemDTO[]>(error)
            ),
    });
};
