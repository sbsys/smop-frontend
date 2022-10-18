/* react */
import { BaseSyntheticEvent, MutableRefObject } from 'react';
/* props */
import { ChildrenProps } from 'shared/props';
/* types */
import {
    CountryListItemDTO,
    Geoinformation,
    Geolocation,
    PreparationTime,
    ServiceHours,
    ServicePhone,
    TypeCharge,
    TypeOrder,
} from 'admin/commerces/types';
import { TabsLayoutRef } from 'shared/layouts';

export interface CreateCommerceContextProps {
    /* states */
    countryList: CountryListItemDTO[];
    tabRef: MutableRefObject<TabsLayoutRef | null>;
    /* functions */
    handleCreateCommerceSubmit: (e?: BaseSyntheticEvent) => Promise<void>;
    handleCancelCreateCommerce: () => void;
    handleNextTab: () => void;
    handlePrevTab: () => void;
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
    minAmountDelivery: number;
    deliveryArea: number;
    deliveringZone: boolean;
}
