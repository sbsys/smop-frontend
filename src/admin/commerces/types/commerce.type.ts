export type CommerceState = 'active' | 'inactive';

export interface CommerceListItemDTO {
    id: string;
    name: string;
    isActive: CommerceState;
    createdAt: Date;
}

export interface Geoinformation {
    city: string;
    state: string;
    country: string;
    timezone: string;
    gtmOffset: string;
}

export interface ServicePhone {
    phone: string;
}

export type DayKey = 'Sunday' | 'Monday' | 'Tuesday' | 'Wenesday' | 'Thursday' | 'Friday' | 'Saturday';
export const DayId: Record<DayKey, number> = {
    Sunday: 1,
    Monday: 2,
    Tuesday: 3,
    Wenesday: 4,
    Thursday: 5,
    Friday: 6,
    Saturday: 7,
};

export interface DayService {
    key: DayKey;
    dayId: number;
    closing: string;
    enabled: boolean;
    opening: string;
}

export interface Schedule {
    opening: string;
    closing: string;
}

export interface ExtendedDayService {
    key: DayKey;
    dayId: number;
    schedules: Schedule[];
    enabled: boolean;
}

export const DayServiceValue: DayService[] = [
    {
        key: 'Sunday',
        dayId: 1,
        opening: '00:00',
        closing: '00:00',
        enabled: false,
    },
    {
        key: 'Monday',
        dayId: 2,
        opening: '00:00',
        closing: '00:00',
        enabled: false,
    },
    {
        key: 'Tuesday',
        dayId: 3,
        opening: '00:00',
        closing: '00:00',
        enabled: false,
    },
    {
        key: 'Wenesday',
        dayId: 4,
        opening: '00:00',
        closing: '00:00',
        enabled: false,
    },
    {
        key: 'Thursday',
        dayId: 5,
        opening: '00:00',
        closing: '00:00',
        enabled: false,
    },
    {
        key: 'Friday',
        dayId: 6,
        opening: '00:00',
        closing: '00:00',
        enabled: false,
    },
    {
        key: 'Saturday',
        dayId: 7,
        opening: '00:00',
        closing: '00:00',
        enabled: false,
    },
];

export interface ServiceHours {
    onsite: DayService[];
    delivery: DayService[];
}

export interface ExtendedServiceHours {
    onsite: ExtendedDayService[];
    delivery: ExtendedDayService[];
}

export interface PreparationTime {
    hours: number;
    minutes: number;
}

export type TypeOrderKey = 'pickup' | 'curbside' | 'delivery' | 'dine-in';

export interface TypeOrder {
    type: TypeOrderKey;
    enabled: boolean;
}

export const TypeOrderValue: TypeOrder[] = [
    {
        type: 'pickup',
        enabled: false,
    },
    {
        type: 'curbside',
        enabled: false,
    },
    {
        type: 'delivery',
        enabled: false,
    },
    {
        type: 'dine-in',
        enabled: false,
    },
];

export type TypeChargeKey = 'percentage' | 'amount';

export type TypeChargeSymbol = '%' | '$';

export const TypeChargeKeySymbol: Record<TypeChargeKey, TypeChargeSymbol> = {
    percentage: '%',
    amount: '$',
};

export interface TypeCharge {
    type: TypeChargeKey;
    value: number;
    symbol: TypeChargeSymbol;
    enabled: boolean;
}

export const TypeChargeValue: TypeCharge[] = [
    {
        type: 'percentage',
        value: 0,
        symbol: '%',
        enabled: false,
    },
    {
        type: 'amount',
        value: 0,
        symbol: '$',
        enabled: false,
    },
];

export interface Geolocation {
    latitude: number;
    longitude: number;
    error: {
        latitude: number;
        longitude: number;
    };
}

export interface CommerceDetailDTO {
    commerceId: string;
    referenceName: string;
    address: string;
    optionalAddress: string;
    zipcode: string;
    geoinformation: Geoinformation;
    servicePhones: ServicePhone[];
    geohash: string;
    globalRaiting: string;
    serviceHours: ExtendedServiceHours;
    thirdPartyDelivery: boolean;
    externalDeliveryUrl: string;
    deliveryPreparationTime: PreparationTime;
    onsitePreparationTime: PreparationTime;
    minAmountDelivery: string;
    orderOnline: boolean;
    typeOrder: TypeOrder[];
    typeCharge: TypeCharge[];
    applyCharge: number;
    deliveryArea: string;
    deliveringZone: boolean;
    smsAlerts: boolean;
    organizationId: string;
    isActive: boolean;
    createdAt: Date;
    geolocation: Geolocation;
}
