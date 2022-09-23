import { AxiosError } from 'axios';
import { ApiResponse } from '../types';

export const apiSerializer = <T>(data: any, serializer?: (data: any) => T): ApiResponse<T> => ({
    message: data.message,
    error: !data.status,
    data: typeof serializer === 'function' ? serializer(data.data) : (data.data as T),
});

export const apiErrorSerializer = <T>(error: AxiosError, serializer?: (data: any) => T): ApiResponse<T> => {
    if (error.response?.data) return apiSerializer({ ...(error.response?.data as Object) }, serializer);
    else if (error.request?.data)
        return {
            message: error.request.data,
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

export const apiOnErrorSideEffect = async <R>(
    error: AxiosError,
    condition: (error: AxiosError) => boolean,
    SideEffect: () => Promise<R>,
    errorSerializer: (error: AxiosError) => R
) => {
    if (condition(error)) return await SideEffect();

    return errorSerializer(error);
};

export const is403ErrorResponse = (error: AxiosError) => error.response?.status === 403;

export const is307ErrorResponse = (error: AxiosError) => error.response?.status === 307;
