/* services */
import { AdminApiService, apiErrorSerializer, ApiResponse, apiSerializer } from 'admin/core';
/* serializers */
import { titleProductListSerializer } from '../serializers';
/* handlers */
import { apiRequestHandler } from 'shared/handlers';
/* types */
import { TitleProductListItem } from '../types';

interface GetTitleProductListProps {}

export const getTitleProductListService = async (
    schema: string,
    commerceId: string,
    titleId: number,
    props?: GetTitleProductListProps
): Promise<ApiResponse<TitleProductListItem[]>> => {
    return await apiRequestHandler({
        instance: AdminApiService,
        endpoint: `/publisher/${schema}/commerce/${commerceId}/title/${titleId}/product`,
        method: 'GET',
        body: props,
        responseSerializer: async data => apiSerializer(data, titleProductListSerializer),
        errorSerializer: async error => apiErrorSerializer(error),
    });
};
