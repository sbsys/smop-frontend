import { AxiosError, AxiosInstance } from 'axios';

type ApiMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface KeyValue {
    [x: string]: string | number | boolean;
}

interface ApiRequestProps<R, B, P> {
    instance: AxiosInstance;
    headers?: KeyValue;
    token?: string;
    method?: ApiMethods;
    endpoint: string;
    body?: B;
    params?: P;
    responseSerializer: (data: any) => R;
    errorSerializer: (error: AxiosError) => R;
    abort?: AbortController;
}

export const apiRequestHandler = async <R, B = any, P extends KeyValue = {}>({
    instance,
    headers,
    token = '',
    method = 'GET',
    endpoint,
    body,
    params,
    responseSerializer,
    errorSerializer,
    abort,
}: ApiRequestProps<R, B, P>): Promise<R> => {
    try {
        const response = await instance.request({
            headers: { 'Content-Type': 'application/json', Authorization: token, ...headers },
            method,
            url: endpoint,
            params,
            data: body,
            signal: abort?.signal,
        });

        return responseSerializer(response.data);
    } catch (error) {
        return errorSerializer(error as AxiosError);
    }
};
