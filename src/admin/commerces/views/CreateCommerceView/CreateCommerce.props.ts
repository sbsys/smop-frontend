/* react */
import { BaseSyntheticEvent } from 'react';
/* props */
import { ChildrenProps } from 'shared/props';
/* types */
import {
    Geoinformation,
    Geolocation,
    PreparationTime,
    ServiceHours,
    ServicePhone,
    TypeCharge,
    TypeOrder,
} from 'admin/commerces/types';

export interface CreateCommerceContextProps {
    /* states */
    /* functions */
    handleCreateCommerceSubmit: (e?: BaseSyntheticEvent) => Promise<void>;
    handleCancelCreateCommerce: () => void;
    /* props */
}

export interface CreateCommerceProviderProps extends ChildrenProps {
    context: CreateCommerceContextProps;
}

export interface CreateCommerceForm {
    /* reference */
    referenceName: string;
    address: string;
    optionalAddress: string;
    zipcode: string;
    geoinformation: Geoinformation;
    servicePhones: ServicePhone[];
    geolocation: Omit<Geolocation, 'error'>;
    /* setting */
    orderOnline: boolean;
    typeOrder: TypeOrder[];
    typeCharge: TypeCharge[];
    applyCharge: number;
    smsAlerts: boolean;
    /* attention */
    serviceHours: ServiceHours;
    onsitePreparationTime: PreparationTime;
    deliveryPreparationTime: PreparationTime;
    /* delivery */
    thirdPartyDelivery: boolean;
    externalDeliveryUrl: string;
    minAmountDelivery: string;
    deliveryArea: string;
    deliveringZone: boolean;
}
