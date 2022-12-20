import { ServicePhone } from './organization.type';

export interface CommerceDetail {}

export interface Geoinformation {
    city: string;
    state: string;
    country: string;
    timezone: string;
    gtmOffset: string;
}

export interface GeolocationError {
    latitude: number;
    longitude: number;
}

export interface Geolocation {
    latitude: number;
    longitude: number;
    error: GeolocationError;
}

export interface CommerceDetailAux {
    /* general */
    organizationId: string;
    commerceId: string;
    referenceName: string;
    address: string;
    optionalAddress: string;
    zipcode: string;
    servicePhones: ServicePhone[];
    geoinformation: Geoinformation;
    geolocation: Geolocation;
    globalRaiting: number;
}

export const aux = {
    serviceHours: {
        onsite: [
            {
                key: 'Sunday',
                dayId: 1,
                enabled: true,
                schedules: [
                    {
                        closing: '18:00',
                        opening: '09:00',
                    },
                ],
            },
            {
                key: 'Monday',
                dayId: 2,
                enabled: true,
                schedules: [
                    {
                        closing: '18:00',
                        opening: '09:00',
                    },
                ],
            },
            {
                key: 'Tuesday',
                dayId: 3,
                enabled: true,
                schedules: [
                    {
                        closing: '18:00',
                        opening: '09:00',
                    },
                ],
            },
            {
                key: 'Wenesday',
                dayId: 4,
                enabled: true,
                schedules: [
                    {
                        closing: '18:00',
                        opening: '09:00',
                    },
                ],
            },
            {
                key: 'Thursday',
                dayId: 5,
                enabled: true,
                schedules: [
                    {
                        closing: '18:00',
                        opening: '09:00',
                    },
                ],
            },
            {
                key: 'Friday',
                dayId: 6,
                enabled: true,
                schedules: [
                    {
                        closing: '18:00',
                        opening: '09:00',
                    },
                ],
            },
            {
                key: 'Saturday',
                dayId: 7,
                enabled: true,
                schedules: [
                    {
                        closing: '18:00',
                        opening: '09:00',
                    },
                ],
            },
        ],
        pickup: [
            {
                key: 'Sunday',
                dayId: 1,
                enabled: false,
                schedules: [
                    {
                        closing: '17:00',
                        opening: '08:00',
                    },
                ],
            },
            {
                key: 'Monday',
                dayId: 2,
                enabled: false,
                schedules: [
                    {
                        closing: '17:00',
                        opening: '08:00',
                    },
                ],
            },
            {
                key: 'Tuesday',
                dayId: 3,
                enabled: false,
                schedules: [
                    {
                        closing: '17:00',
                        opening: '08:00',
                    },
                ],
            },
            {
                key: 'Wenesday',
                dayId: 4,
                enabled: false,
                schedules: [
                    {
                        closing: '17:00',
                        opening: '08:00',
                    },
                ],
            },
            {
                key: 'Thursday',
                dayId: 5,
                enabled: false,
                schedules: [
                    {
                        closing: '17:00',
                        opening: '08:00',
                    },
                ],
            },
            {
                key: 'Friday',
                dayId: 6,
                enabled: false,
                schedules: [
                    {
                        closing: '17:00',
                        opening: '08:00',
                    },
                ],
            },
            {
                key: 'Saturday',
                dayId: 7,
                enabled: false,
                schedules: [
                    {
                        closing: '17:00',
                        opening: '08:00',
                    },
                ],
            },
        ],
        curbside: [
            {
                key: 'Sunday',
                dayId: 1,
                enabled: false,
                schedules: [
                    {
                        closing: '17:00',
                        opening: '08:00',
                    },
                ],
            },
            {
                key: 'Monday',
                dayId: 2,
                enabled: false,
                schedules: [
                    {
                        closing: '17:00',
                        opening: '08:00',
                    },
                ],
            },
            {
                key: 'Tuesday',
                dayId: 3,
                enabled: false,
                schedules: [
                    {
                        closing: '17:00',
                        opening: '08:00',
                    },
                ],
            },
            {
                key: 'Wenesday',
                dayId: 4,
                enabled: false,
                schedules: [
                    {
                        closing: '17:00',
                        opening: '08:00',
                    },
                ],
            },
            {
                key: 'Thursday',
                dayId: 5,
                enabled: false,
                schedules: [
                    {
                        closing: '17:00',
                        opening: '08:00',
                    },
                ],
            },
            {
                key: 'Friday',
                dayId: 6,
                enabled: false,
                schedules: [
                    {
                        closing: '17:00',
                        opening: '08:00',
                    },
                ],
            },
            {
                key: 'Saturday',
                dayId: 7,
                enabled: false,
                schedules: [
                    {
                        closing: '17:00',
                        opening: '08:00',
                    },
                ],
            },
        ],
        delivery: [
            {
                key: 'Sunday',
                dayId: 1,
                enabled: true,
                schedules: [
                    {
                        closing: '17:00',
                        opening: '09:00',
                    },
                ],
            },
            {
                key: 'Monday',
                dayId: 2,
                enabled: true,
                schedules: [
                    {
                        closing: '17:00',
                        opening: '09:00',
                    },
                ],
            },
            {
                key: 'Tuesday',
                dayId: 3,
                enabled: true,
                schedules: [
                    {
                        closing: '17:00',
                        opening: '09:00',
                    },
                ],
            },
            {
                key: 'Wenesday',
                dayId: 4,
                enabled: true,
                schedules: [
                    {
                        closing: '17:00',
                        opening: '09:00',
                    },
                ],
            },
            {
                key: 'Thursday',
                dayId: 5,
                enabled: true,
                schedules: [
                    {
                        closing: '17:00',
                        opening: '09:00',
                    },
                ],
            },
            {
                key: 'Friday',
                dayId: 6,
                enabled: true,
                schedules: [
                    {
                        closing: '17:00',
                        opening: '09:00',
                    },
                ],
            },
            {
                key: 'Saturday',
                dayId: 7,
                enabled: true,
                schedules: [
                    {
                        closing: '17:00',
                        opening: '09:00',
                    },
                ],
            },
        ],
    },
    thirdPartyDelivery: false,
    externalDeliveryUrl: '-',
    deliveryPreparationTime: {
        hours: 0,
        minutes: 0,
    },
    onsitePreparationTime: {
        hours: 0,
        minutes: 0,
    },
    minAmountDelivery: '3.00',
    orderOnline: false,
    typeOrder: [
        {
            type: 'pickup',
            enabled: true,
        },
        {
            type: 'curbside',
            enabled: true,
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
            value: 0,
            symbol: '%',
            enabled: false,
        },
        {
            type: 'amount',
            value: 1,
            symbol: '$',
            enabled: true,
        },
    ],
    applyCharge: 0,
    deliveryArea: '2.00',
    deliveringZone: true,
    smsAlerts: false,
    menu: [
        {
            titleId: 1,
            defaultTitle: 'Breakfasts',
            titleCollection: [
                {
                    ref: 'Breakfasts',
                    lang: 'en',
                },
                {
                    ref: 'Desayunos',
                    lang: 'es',
                },
            ],
            url: 'http://46e2-2803-2d60-1104-2976-a852-2060-dc89-b78b.ngrok.io/smop/api/v1/file/e46072ce2db67570d34b020dfebb2f2440597688313443c0c7d0279e974cea789c91f1ca3ada4d2aed881b165f79df4c15edcfa9f2e379fad26c0ade0b5d30f8c632aa222d8596a04abccabc7e3661b1193463ed7d839a9e3faf7c9e1d9c612f5bb27cf5ab978ebb6bad04a09eaba28e',
        },
        {
            titleId: 2,
            defaultTitle: 'Lunches',
            titleCollection: [
                {
                    ref: 'Lunches',
                    lang: 'en',
                },
                {
                    ref: 'Almuerzos',
                    lang: 'es',
                },
            ],
            url: 'http://46e2-2803-2d60-1104-2976-a852-2060-dc89-b78b.ngrok.io/smop/api/v1/file/e46072ce2db67570d34b020dfebb2f24d84858d7316ca6f9f7c1cac30dbec5efbe4fd605fc6c283dd0a2b28cc1a62f0b6e2bbd7074d29e03028316958d74b2cd032e4972c833b4c7d0038a248e10923b363f70f0fa73a2a2a3fd7f5ed88c0da42bf50d80b50ccdf1bd7bb5b6742ae6f4',
        },
        {
            titleId: 3,
            defaultTitle: 'Combos',
            titleCollection: [
                {
                    ref: 'Combos',
                    lang: 'en',
                },
                {
                    ref: 'Combos',
                    lang: 'es',
                },
            ],
            url: 'http://46e2-2803-2d60-1104-2976-a852-2060-dc89-b78b.ngrok.io/smop/api/v1/file/e46072ce2db67570d34b020dfebb2f24e3877e69113f7a1f202e002f2069f61c89696a510d6d479d3c6b954f483a294e5c438a3d16f37b199b62ba5d01b65fcc0bb6d672cff616e45eac91e455a182d3a3d13df8ceab9ffca33724d3da2e715a18ca518035a5b206c7f3badfbd96045e',
        },
        {
            titleId: 4,
            defaultTitle: 'dinners',
            titleCollection: [
                {
                    ref: 'dinners',
                    lang: 'en',
                },
                {
                    ref: 'cenas',
                    lang: 'es',
                },
            ],
            url: 'http://46e2-2803-2d60-1104-2976-a852-2060-dc89-b78b.ngrok.io/smop/api/v1/file/e46072ce2db67570d34b020dfebb2f24fa88cbe299fd294673a256e15164f16774ede5ac55b4c4b7364bbcffbbd3ebe4b617e39e5e30a599388bdfe775bf9a3b29edfc85f97f1bc7375781ae4ec9b1248d99a0551103541b325696defa899befbefd38e11a701e88eba79e0fef9a0980',
        },
        {
            titleId: 5,
            defaultTitle: 'Soups',
            titleCollection: [
                {
                    ref: 'Soups',
                    lang: 'en',
                },
                {
                    ref: 'Sopas y caldos',
                    lang: 'es',
                },
            ],
            url: 'http://46e2-2803-2d60-1104-2976-a852-2060-dc89-b78b.ngrok.io/smop/api/v1/file/e46072ce2db67570d34b020dfebb2f24f0d1f081a69ef8f617377f146e01bcaf8103ad9bbac01b20d0e62eac1f17f5ad9b8ceeae2a0249a5a7daecae87289cc628698988db384880cc8eda38dc4667108af66d25e1c1a4bfbb47a22fb5157e691a057389cb3d714e39d91c869c3c2e30',
        },
    ],
};
