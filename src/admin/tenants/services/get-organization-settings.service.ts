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

interface OrganizationSettingsProps {}

const mock: ApiResponse<OrganizationSettingsDTO> = {
    error: false,
    message: 'Organization Settings',
    data: {},
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
