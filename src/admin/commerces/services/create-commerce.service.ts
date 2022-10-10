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
import { CreateCommerceForm } from '../views';

interface CreateCommerceProps extends CreateCommerceForm {}

export const createCommerceService = async (props: CreateCommerceProps): Promise<ApiResponse<{}>> => {
    if (!props.optionalAddress) props.optionalAddress = '-';
    if (!props.externalDeliveryUrl) props.externalDeliveryUrl = '-';

    props.onsitePreparationTime = {
        hours: Number.parseInt(`${props.onsitePreparationTime.hours}` || '0'),
        minutes: Number.parseInt(`${props.onsitePreparationTime.minutes}` || '0'),
    };
    props.deliveryPreparationTime = {
        hours: Number.parseInt(`${props.deliveryPreparationTime.hours}` || '0'),
        minutes: Number.parseInt(`${props.deliveryPreparationTime.minutes}` || '0'),
    };

    props.minAmountDelivery = Number.parseInt(`${props.minAmountDelivery}` || '0');
    props.deliveryArea = Number.parseInt(`${props.deliveryArea}` || '0');

    props.typeCharge[0].value = Number.parseInt(`${props.typeCharge[0].value}` || '0');
    props.typeCharge[1].value = Number.parseInt(`${props.typeCharge[1].value}` || '0');

    return await apiRequestHandler<ApiResponse<{}>>({
        instance: AdminApiService,
        endpoint: '/commerce',
        token: getCurrentUserToken(),
        method: 'POST',
        body: props,
        responseSerializer: async data => apiSerializer<{}>(data),
        errorSerializer: error =>
            apiOnErrorSideEffect<ApiResponse<{}>>(
                error,
                is403ErrorResponse,
                async () =>
                    (await repeatRequestOnRefreshTokenService(() => createCommerceService(props))) as ApiResponse<{}>,
                error => apiErrorSerializer<{}>(error)
            ),
    });
};
