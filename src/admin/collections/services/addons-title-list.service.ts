/* services */
import {
    AdminApiService,
    apiErrorSerializer,
    apiOnErrorSideEffect,
    ApiResponse,
    apiSerializer,
    is403ErrorResponse,
    offline,
} from 'admin/core';
import { getCurrentUserToken, repeatRequestOnRefreshTokenService } from 'admin/auth';
/* serializers */
import { titleListSerializer } from '../serializers';
/* handlers */
import { apiRequestHandler } from 'shared/handlers';
/* utils */
import { parse } from 'date-fns';
/* types */
import { TitleListItemDTO } from '../types';

interface AddonsTitleListProps {}

const mock: ApiResponse<TitleListItemDTO[]> = {
    error: false,
    message: 'Addons title list',
    data: [
        {
            titleId: 1,
            titleCollection: [],
            defaultTitle: 'Ensalad',
            multiLanguage: false,
            totalProducts: 4,
            isActive: 'active',
            createdAt: parse('2022-08-29', 'yyyy-MM-dd', Date.now()),
            updatedAt: parse('2022-08-29', 'yyyy-MM-dd', Date.now()),
        },
        {
            titleId: 2,
            titleCollection: [
                {
                    lang: 'es',
                    ref: 'Pan',
                },
                {
                    lang: 'en',
                    ref: 'Bread',
                },
            ],
            defaultTitle: 'Bread',
            multiLanguage: true,
            totalProducts: 8,
            isActive: 'active',
            createdAt: parse('2022-08-30', 'yyyy-MM-dd', Date.now()),
            updatedAt: parse('2022-08-30', 'yyyy-MM-dd', Date.now()),
        },
        {
            titleId: 3,
            titleCollection: [
                {
                    lang: 'es',
                    ref: 'Bebidas',
                },
                {
                    lang: 'en',
                    ref: 'Drinks',
                },
            ],
            defaultTitle: 'Drinks',
            multiLanguage: true,
            totalProducts: 1,
            isActive: 'inactive',
            createdAt: parse('2022-09-01', 'yyyy-MM-dd', Date.now()),
            updatedAt: parse('2022-09-01', 'yyyy-MM-dd', Date.now()),
        },
    ],
};

export const addonsTitleListService = async (
    props?: AddonsTitleListProps
): Promise<ApiResponse<TitleListItemDTO[]>> => {
    if (offline) return mock;
    /* const body = new FormData();

    (Object.keys(props) as (keyof AddonsTitleListProps)[]).forEach(key => body.append(key, props[key])); */

    return await apiRequestHandler<ApiResponse<TitleListItemDTO[]>>({
        instance: AdminApiService,
        endpoint: '/shop/complement-title',
        token: getCurrentUserToken(),
        method: 'GET',
        responseSerializer: async data => apiSerializer<TitleListItemDTO[]>(data, titleListSerializer),
        errorSerializer: error =>
            apiOnErrorSideEffect<ApiResponse<TitleListItemDTO[]>>(
                error,
                is403ErrorResponse,
                async () =>
                    (await repeatRequestOnRefreshTokenService(() => addonsTitleListService(props))) as ApiResponse<
                        TitleListItemDTO[]
                    >,
                error => apiErrorSerializer<TitleListItemDTO[]>(error)
            ),
    });
};
