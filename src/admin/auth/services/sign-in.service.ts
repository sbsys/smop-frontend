/* services */
import { AdminApiService, apiErrorSerializer, ApiResponse, apiSerializer } from 'admin/core';
/* serializers */
import { signInSerializer } from '../serializers';
/* handlers */
import { apiRequestHandler } from 'shared/handlers';
/* types */
import { SignInDTO } from '../types';

interface SignInProps {
    email: string;
    password: string;
}

export const signInService = async (props: SignInProps): Promise<ApiResponse<SignInDTO>> => {
    const body = new FormData();

    (Object.keys(props) as (keyof SignInProps)[]).forEach(key => body.append(key, props[key]));

    return await apiRequestHandler<ApiResponse<SignInDTO>, FormData>({
        instance: AdminApiService,
        endpoint: '/auth/login/admins',
        method: 'POST',
        body,
        responseSerializer: data => apiSerializer<SignInDTO>(data, signInSerializer),
        errorSerializer: error => apiErrorSerializer<SignInDTO>(error),
    });
};
