/* services */
import { AdminApiService, apiErrorSerializer, ApiResponse, apiSerializer } from 'admin/core';
/* serializers */
import { organizationDetailSerializer } from '../serializers';
/* handlers */
import { apiRequestHandler } from 'shared/handlers';
/* types */
import { OrganizationDetail } from '../types';

interface GetOrgPublisherDetailProps {}

export const getOrgPublisherDetailService = async (
    schema: string,
    props?: GetOrgPublisherDetailProps
): Promise<ApiResponse<OrganizationDetail>> => {
    return await apiRequestHandler({
        instance: AdminApiService,
        endpoint: `/publisher/${schema}`,
        method: 'GET',
        body: props,
        responseSerializer: async data => apiSerializer(data, organizationDetailSerializer),
        errorSerializer: async error => apiErrorSerializer(error),
    });
};
