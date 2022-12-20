/* services */
import { AdminApiService, apiErrorSerializer, ApiResponse, apiSerializer } from 'admin/core';
/* serializers */
import { commerceDetailSerializer } from '../serializers';
/* handlers */
import { apiRequestHandler } from 'shared/handlers';
/* types */
import { CommerceDetail } from '../types';

interface GetCommerceDetailProps {}

export const getCommerceDetailService = async (
    schema: string,
    commerceId: string,
    props?: GetCommerceDetailProps
): Promise<ApiResponse<CommerceDetail>> => {
    return await apiRequestHandler({
        instance: AdminApiService,
        endpoint: `/publisher/${schema}/commerce/${commerceId}`,
        method: 'GET',
        body: props,
        responseSerializer: async data => apiSerializer(data, commerceDetailSerializer),
        errorSerializer: async error => apiErrorSerializer(error),
    });
};
