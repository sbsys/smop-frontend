/* services */
import { AdminApiService, apiErrorSerializer, ApiResponse, apiSerializer } from 'admin/core';
/* serializers */
import { titleProductConfigSerializer } from '../serializers';
/* handlers */
import { apiRequestHandler } from 'shared/handlers';
/* types */
import { ProductConfig } from '../types';

interface GetTitleProductConfigProps {}

export const getTitleProductConfigService = async (
    schema: string,
    productId: string,
    props?: GetTitleProductConfigProps
): Promise<ApiResponse<ProductConfig>> => {
    return await apiRequestHandler({
        instance: AdminApiService,
        endpoint: `/publisher/${schema}/product/${productId}`,
        method: 'GET',
        body: props,
        responseSerializer: async data => apiSerializer(data, titleProductConfigSerializer),
        errorSerializer: async error => apiErrorSerializer(error),
    });
};
