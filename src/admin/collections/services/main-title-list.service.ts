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
import { mainTitleListSerializer } from '../serializers';
/* handlers */
import { apiRequestHandler } from 'shared/handlers';
/* utils */
import { parse } from 'date-fns';
/* types */
import { MainTitleListItemDTO } from '../types';

interface MainTitleListProps {}

const mock: ApiResponse<MainTitleListItemDTO[]> = {
    error: false,
    message: 'Main title list',
    data: [
        {
            titleId: 1,
            titleCollection: [],
            defaultTitle: 'Dinner',
            multiLanguage: false,
            totalProducts: 3,
            isActive: 'active',
            createdAt: parse('2022-08-29', 'yyyy-MM-dd', Date.now()),
            updatedAt: parse('2022-08-29', 'yyyy-MM-dd', Date.now()),
            serviceMode: 1,
            servedOn: '-',
        },
        {
            titleId: 2,
            titleCollection: [
                {
                    lang: 'es',
                    ref: 'Desayunos',
                },
                {
                    lang: 'en',
                    ref: 'Breakfast',
                },
            ],
            defaultTitle: 'Breakfast',
            multiLanguage: true,
            totalProducts: 2,
            isActive: 'active',
            createdAt: parse('2022-08-30', 'yyyy-MM-dd', Date.now()),
            updatedAt: parse('2022-08-30', 'yyyy-MM-dd', Date.now()),
            serviceMode: 1,
            servedOn: '-',
        },
        {
            titleId: 3,
            titleCollection: [
                {
                    lang: 'es',
                    ref: 'Especial',
                },
                {
                    lang: 'en',
                    ref: 'Spetial',
                },
            ],
            defaultTitle: 'Spetial',
            multiLanguage: true,
            totalProducts: 0,
            isActive: 'inactive',
            createdAt: parse('2022-09-01', 'yyyy-MM-dd', Date.now()),
            updatedAt: parse('2022-09-01', 'yyyy-MM-dd', Date.now()),
            serviceMode: 1,
            servedOn: '-',
        },
    ],
};

export const mainTitleListService = async (
    props?: MainTitleListProps
): Promise<ApiResponse<MainTitleListItemDTO[]>> => {
    if (offline) return mock;
    /* const body = new FormData();

    (Object.keys(props) as (keyof MainTitleListProps)[]).forEach(key => body.append(key, props[key])); */

    return await apiRequestHandler<ApiResponse<MainTitleListItemDTO[]>>({
        instance: AdminApiService,
        endpoint: '/shop/main-title',
        token: getCurrentUserToken(),
        method: 'GET',
        responseSerializer: async data => apiSerializer<MainTitleListItemDTO[]>(data, mainTitleListSerializer),
        errorSerializer: error =>
            apiOnErrorSideEffect<ApiResponse<MainTitleListItemDTO[]>>(
                error,
                is403ErrorResponse,
                async () =>
                    (await repeatRequestOnRefreshTokenService(() => mainTitleListService(props))) as ApiResponse<
                        MainTitleListItemDTO[]
                    >,
                error => apiErrorSerializer<MainTitleListItemDTO[]>(error)
            ),
    });
};
