/* services */
import {
    AdminApiService,
    apiErrorSerializer,
    apiOnErrorSideEffect,
    ApiResponse,
    apiSerializer,
    is403ErrorResponse,
    offline,
} from 'admin/core';
import { getCurrentUserToken, repeatRequestOnRefreshTokenService } from 'admin/auth';
/* serializers */
import { commerceDetailSerializer } from '../serializers';
/* handlers */
import { apiRequestHandler } from 'shared/handlers';
/* types */
import { CommerceDetailDTO } from '../types';

interface CommerceDetailProps {
    commerceId: string;
}

const mock: ApiResponse<CommerceDetailDTO> = {
    error: false,
    message: 'Commerce detail',
    data: {
        commerceId: '1',
        referenceName: 'Nike Baja California',
        address: 'Cualquier Direccion Sera suficiente',
        optionalAddress: '-',
        zipcode: '40789',
        geoinformation: {
            city: 'Alfonso Garzon',
            state: 'Baja California',
            country: 'Mexico',
            timezone: 'America/Bahia_Banderas',
            gtmOffset: 'UTC-06:00',
        },
        servicePhones: [
            {
                phoneNumber: '+505-78561289',
            },
            {
                phoneNumber: '+505-45785623',
            },
        ],
        geohash: 'd44nz01xf',
        globalRaiting: '0.0',
        serviceHours: {
            onsite: [
                {
                    key: 'Sunday',
                    dayId: 1,
                    closing: '00:00',
                    enabled: true,
                    opening: '00:00',
                },
                {
                    key: 'Monday',
                    dayId: 2,
                    closing: '19:00',
                    enabled: false,
                    opening: '08:30',
                },
                {
                    key: 'Tuesday',
                    dayId: 3,
                    closing: '19:00',
                    enabled: false,
                    opening: '08:30',
                },
                {
                    key: 'Wenesday',
                    dayId: 4,
                    closing: '19:00',
                    enabled: false,
                    opening: '08:30',
                },
                {
                    key: 'Thursday',
                    dayId: 5,
                    closing: '19:00',
                    enabled: false,
                    opening: '08:00',
                },
                {
                    key: 'Friday',
                    dayId: 6,
                    closing: '22:00',
                    enabled: false,
                    opening: '10:00',
                },
                {
                    key: 'Saturday',
                    dayId: 7,
                    closing: '14:00',
                    enabled: false,
                    opening: '09:00',
                },
            ],
            delivery: [
                {
                    key: 'Sunday',
                    dayId: 1,
                    closing: '00:00',
                    enabled: false,
                    opening: '00:00',
                },
                {
                    key: 'Monday',
                    dayId: 2,
                    closing: '18:00',
                    enabled: true,
                    opening: '10:00',
                },
                {
                    key: 'Tuesday',
                    dayId: 3,
                    closing: '18:00',
                    enabled: true,
                    opening: '10:00',
                },
                {
                    key: 'Wenesday',
                    dayId: 4,
                    closing: '18:00',
                    enabled: true,
                    opening: '10:00',
                },
                {
                    key: 'Thursday',
                    dayId: 5,
                    closing: '18:00',
                    enabled: true,
                    opening: '10:00',
                },
                {
                    key: 'Friday',
                    dayId: 6,
                    closing: '21:00',
                    enabled: true,
                    opening: '10:00',
                },
                {
                    key: 'Saturday',
                    dayId: 7,
                    closing: '13:30',
                    enabled: true,
                    opening: '10:00',
                },
            ],
        },
        thirdPartyDelivery: true,
        externalDeliveryUrl: '-',
        deliveryPreparationTime: {
            hours: 0,
            minutes: 45,
        },
        onsitePreparationTime: {
            hours: 0,
            minutes: 0,
        },
        minAmountDelivery: '50.00',
        orderOnline: true,
        typeOrder: [
            {
                type: 'pickup',
                enabled: true,
            },
            {
                type: 'curbside',
                enabled: false,
            },
            {
                type: 'delivery',
                enabled: true,
            },
            {
                type: 'dine-in',
                enabled: true,
            },
        ],
        typeCharge: [
            {
                type: 'percentage',
                value: 5,
                symbol: '%',
                enabled: true,
            },
            {
                type: 'amount',
                value: 0,
                symbol: '$',
                enabled: false,
            },
        ],
        applyCharge: 1,
        deliveryArea: '0.00',
        deliveringZone: false,
        smsAlerts: true,
        organizationId: 'f547b83e-2ac2-4462-90bf-f2a956a3d7fe',
        isActive: true,
        createdAt: new Date('2022-09-30T17:27:07.213Z'),
        geolocation: {
            latitude: 12.437875270843506,
            longitude: -86.87771558761597,
            error: {
                latitude: 0.000021457672119140625,
                longitude: 0.000021457672119140625,
            },
        },
    },
};

export const commerceDetailService = async (props: CommerceDetailProps): Promise<ApiResponse<CommerceDetailDTO>> => {
    if (offline) return mock;

    return await apiRequestHandler<ApiResponse<CommerceDetailDTO>>({
        instance: AdminApiService,
        endpoint: `/commerce/${props.commerceId}`,
        token: getCurrentUserToken(),
        method: 'GET',
        responseSerializer: async data => apiSerializer<CommerceDetailDTO>(data, commerceDetailSerializer),
        errorSerializer: error =>
            apiOnErrorSideEffect<ApiResponse<CommerceDetailDTO>>(
                error,
                is403ErrorResponse,
                async () =>
                    (await repeatRequestOnRefreshTokenService(() =>
                        commerceDetailService(props)
                    )) as ApiResponse<CommerceDetailDTO>,
                error => apiErrorSerializer<CommerceDetailDTO>(error)
            ),
    });
};
