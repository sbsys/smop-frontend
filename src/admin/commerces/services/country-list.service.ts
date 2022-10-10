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
import { countryListSerializer } from '../serializers';
/* types */
import { CountryListItemDTO } from '../types';

interface CountryListProps {}

export const countryListService = async (props: CountryListProps): Promise<ApiResponse<CountryListItemDTO[]>> => {
    return await apiRequestHandler<ApiResponse<CountryListItemDTO[]>>({
        instance: AdminApiService,
        endpoint: '/props/country',
        token: getCurrentUserToken(),
        method: 'GET',
        responseSerializer: async data => apiSerializer<CountryListItemDTO[]>(data, countryListSerializer),
        errorSerializer: error =>
            apiOnErrorSideEffect<ApiResponse<CountryListItemDTO[]>>(
                error,
                is403ErrorResponse,
                async () =>
                    (await repeatRequestOnRefreshTokenService(() => countryListService(props))) as ApiResponse<
                        CountryListItemDTO[]
                    >,
                error => apiErrorSerializer<CountryListItemDTO[]>(error)
            ),
    });
};
