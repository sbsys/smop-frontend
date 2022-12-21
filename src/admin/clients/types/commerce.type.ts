/* types */
import { Lang, WeekDay } from 'admin/core';
import { ChargeDescription, ServicePhone } from './organization.type';

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

export type CommerceSchedule = {
    closing: string;
    opening: string;
};

export interface ServiceHour {
    key: WeekDay;
    dayId: number;
    enabled: boolean;
    schedules: CommerceSchedule[];
}

export interface ServiceHours {
    onsite: ServiceHour[];
    pickup: ServiceHour[];
    curbside: ServiceHour[];
    delivery: ServiceHour[];
}

export interface PreparationTime {
    hours: number;
    minutes: number;
}

export type OrderType = 'pickup' | 'curbside' | 'delivery' | 'dine-in';

export type AllowedOrder = {
    type: OrderType;
    enabled: boolean;
};

export type ApplyCharge = 'before' | 'after';

export const ApplyChargeMap: Record<number, ApplyCharge> = {
    0: 'after',
    1: 'before',
};

export type LangCollection = {
    ref: string;
    lang: Lang;
};

export interface MainMenuListItem {
    titleId: number;
    defaultTitle: string;
    titleCollection: LangCollection[];
    url: string;
}

export interface CommerceDetail {
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
    smsAlerts: boolean;
    /* service */
    serviceHours: ServiceHours;
    deliveryPreparationTime: PreparationTime;
    onsitePreparationTime: PreparationTime;
    /* delivery */
    orderOnline: boolean;
    minAmountDelivery: number;
    typeOrder: AllowedOrder[];
    deliveringZone: boolean;
    deliveryArea: number;
    thirdPartyDelivery: boolean;
    externalDeliveryUrl: string;
    /* charge */
    typeCharge: ChargeDescription[];
    applyCharge: ApplyCharge;
    /* menu */
    menu: MainMenuListItem[];
}
