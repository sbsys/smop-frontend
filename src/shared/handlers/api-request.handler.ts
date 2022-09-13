import { AxiosError, AxiosInstance } from 'axios';

type ApiMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface KeyValue {
    [x: string]: string | number | boolean;
}

interface ApiRequestProps<R, B, P> {
    instance: AxiosInstance;
    headers?: KeyValue;
    token?: string;
    lang?: string;
    method?: ApiMethods;
    endpoint: string;
    body?: B;
    params?: P;
    responseSerializer: (data: any) => Promise<R>;
    errorSerializer: (error: AxiosError) => Promise<R>;
    abort?: AbortController;
}

export const apiRequestHandler = async <R, B = any, P extends KeyValue = {}>({
    instance,
    headers,
    token = '',
    lang = 'en',
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
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                'Accept-Language': lang,
                ...headers,
            },
            method,
            url: endpoint,
            params,
            data: body,
            signal: abort?.signal,
        });

        return await responseSerializer(response.data);
    } catch (error) {
        return await errorSerializer(error as AxiosError);
    }
};
