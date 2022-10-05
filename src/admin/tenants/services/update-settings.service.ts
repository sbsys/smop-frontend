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
/* handlers */
import { apiRequestHandler } from 'shared/handlers';

interface Language {
    languageId: string;
    preferredLanguage: boolean;
}

interface SettingsProps {
    decimals: number;
    multiLanguage: boolean;
    languages: Language[];
}
interface UpdateSettingsProps {
    orgId: string;
    settings: SettingsProps;
}

export interface UpdateSettingsResponse {}

export const updateSettingsService = async (
    props: UpdateSettingsProps
): Promise<ApiResponse<UpdateSettingsResponse>> => {
    return await apiRequestHandler<ApiResponse<UpdateSettingsResponse>, SettingsProps>({
        instance: AdminApiService,
        endpoint: `/org/${props.orgId}/settings`,
        token: getCurrentUserToken(),
        method: 'PUT',
        body: props.settings,
        responseSerializer: async data => apiSerializer<UpdateSettingsResponse>(data),
        errorSerializer: error =>
            apiOnErrorSideEffect<ApiResponse<UpdateSettingsResponse>>(
                error,
                is403ErrorResponse,
                async () =>
                    (await repeatRequestOnRefreshTokenService(() =>
                        updateSettingsService(props)
                    )) as ApiResponse<UpdateSettingsResponse>,
                error => apiErrorSerializer<UpdateSettingsResponse>(error)
            ),
    });
};
