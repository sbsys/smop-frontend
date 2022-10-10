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
import { departmentListSerializer } from '../serializers';
/* types */
import { DepartmentDTO } from '../types';

interface DepartmentListProps {
    cca3: string;
}

export const departmentListService = async (props: DepartmentListProps): Promise<ApiResponse<DepartmentDTO>> => {
    return await apiRequestHandler<ApiResponse<DepartmentDTO>>({
        instance: AdminApiService,
        endpoint: `/props/country-timezone?cca3=${props.cca3}`,
        token: getCurrentUserToken(),
        method: 'GET',
        responseSerializer: async data => apiSerializer<DepartmentDTO>(data, departmentListSerializer),
        errorSerializer: error =>
            apiOnErrorSideEffect<ApiResponse<DepartmentDTO>>(
                error,
                is403ErrorResponse,
                async () =>
                    (await repeatRequestOnRefreshTokenService(() =>
                        departmentListService(props)
                    )) as ApiResponse<DepartmentDTO>,
                error => apiErrorSerializer<DepartmentDTO>(error)
            ),
    });
};
