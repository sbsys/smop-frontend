import { AxiosError } from 'axios';
import { ApiResponse } from '../types';

export const apiSerializer = <T>(data: any, serializer?: (data: any) => T): ApiResponse<T> => ({
    message: data.message,
    error: data.error,
    data: typeof serializer === 'function' ? serializer(data.data) : ({} as T),
});

export const apiErrorSerializer = <T>(error: AxiosError, serializer?: (data: any) => T): ApiResponse<T> => {
    if (error.response) return apiSerializer(error.response, serializer);
    else if (error.request)
        return {
            message: error.request,
            error: true,
            data: {} as T,
        };
    else
        return {
            message: error.message,
            error: true,
            data: {} as T,
        };
};