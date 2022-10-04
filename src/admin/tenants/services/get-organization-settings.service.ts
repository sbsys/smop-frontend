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
import { organizationSettingsSerializer } from '../serializers';
/* handlers */
import { apiRequestHandler } from 'shared/handlers';
/* types */
import { OrganizationSettingsDTO } from '../types';
/* assets */
import { TenantCoverSrc, TenantProfileSrc } from 'assets';

interface OrganizationSettingsProps {}

const mock: ApiResponse<OrganizationSettingsDTO> = {
    error: false,
    message: 'Organization Settings',
    data: {
        organizationId: 'f547b83e-2ac2-4462-90bf-f2a956a3d7fe',
        ownerReference: 'Nikolas Warren',
        organizationName: 'NikeSport',
        multiLanguage: true,
        maxLangAllow: 2,
        decimals: 2,
        readySettings: false,
        internationalization: [
            {
                id: 1,
                abbreviation: 'en',
                flagpng: 'https://flagcdn.com/w320/gb.png',
                flagsvg: 'https://flagcdn.com/gb.svg',
                isAvailable: true,
                preferredLanguage: true,
            },
            {
                id: 2,
                abbreviation: 'es',
                flagpng: 'https://flagcdn.com/w320/es.png',
                flagsvg: 'https://flagcdn.com/es.svg',
                isAvailable: true,
                preferredLanguage: false,
            },
        ],
        files: [
            {
                isCover: false,
                url: TenantProfileSrc,
            },
            {
                isCover: true,
                url: TenantCoverSrc,
            },
        ],
    },
};

export const getOrganizationSettingsService = async (
    props?: OrganizationSettingsProps
): Promise<ApiResponse<OrganizationSettingsDTO>> => {
    if (offline) return mock;
    /* const body = new FormData();

    (Object.keys(props) as (keyof ListTenantProps)[]).forEach(key => body.append(key, props[key])); */

    return await apiRequestHandler<ApiResponse<OrganizationSettingsDTO>>({
        instance: AdminApiService,
        endpoint: '/org',
        token: getCurrentUserToken(),
        method: 'GET',
        responseSerializer: async data => apiSerializer<OrganizationSettingsDTO>(data, organizationSettingsSerializer),
        errorSerializer: error =>
            apiOnErrorSideEffect<ApiResponse<OrganizationSettingsDTO>>(
                error,
                is403ErrorResponse,
                async () =>
                    (await repeatRequestOnRefreshTokenService(() =>
                        getOrganizationSettingsService(props)
                    )) as ApiResponse<OrganizationSettingsDTO>,
                error => apiErrorSerializer<OrganizationSettingsDTO>(error)
            ),
    });
};
