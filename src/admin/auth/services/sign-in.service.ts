/* services */
import {
    AdminApiService,
    apiErrorSerializer,
    apiOnErrorSideEffect,
    ApiResponse,
    apiSerializer,
    is307ErrorResponse,
    offline,
} from 'admin/core';
import { triggerResetPasswordService } from './trigger-password-recovery.service';
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

const mock: ApiResponse<SignInDTO> = {
    data: {
        token: 'qwerty',
        user: {
            id: '1',
            email: 'sb.sys@outlook.com',
            name: 'Steven Bustillo',
            phone: '+505-89687333',
            profiles: 'manager',
            isActive: true,
        },
    },
    error: false,
    message: 'Mock auth',
};

export const signInService = async (props: SignInProps): Promise<ApiResponse<SignInDTO>> => {
    if (offline) return mock;

    const body = new FormData();

    (Object.keys(props) as (keyof SignInProps)[]).forEach(key => body.append(key, props[key]));

    return await apiRequestHandler<ApiResponse<SignInDTO>, FormData>({
        instance: AdminApiService,
        endpoint: '/auth/login/admins',
        method: 'POST',
        body,
        responseSerializer: async data => apiSerializer<SignInDTO>(data, signInSerializer),
        /* errorSerializer: async error => apiErrorSerializer<SignInDTO>(error), */
        errorSerializer: error =>
            apiOnErrorSideEffect<ApiResponse<SignInDTO>>(
                error,
                is307ErrorResponse,
                async () => {
                    triggerResetPasswordService();

                    return await apiErrorSerializer<SignInDTO>(error);
                },
                error => apiErrorSerializer<SignInDTO>(error)
            ),
    });
};
