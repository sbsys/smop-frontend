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
/* utils */
import * as yup from 'yup';

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

export const CreateCommerceSchema = yup
    .object({
        /* references */
        referenceName: yup.string().required('views.createcommerce.reference.form.name.required'),
        servicePhones: yup.array(
            yup
                .object({
                    phoneNumber: yup
                        .string()
                        .required('views.createcommerce.reference.form.phone.required')
                        .matches(/^\+\d{3}-\d{7,8}$/, 'views.createcommerce.reference.form.phone.format'),
                })
                .required()
        ),
        geoinformation: yup
            .object({
                country: yup.string().required('views.createcommerce.reference.form.country.required'),
                state: yup.string().required('views.createcommerce.reference.form.state.required'),
                city: yup.string().required('views.createcommerce.reference.form.city.required'),
                timezone: yup.string().required('views.createcommerce.reference.form.timezone.required'),
                gtmOffset: yup.string().required('views.createcommerce.reference.form.gtmoffset.required'),
            })
            .required(),
        address: yup.string().required('views.createcommerce.reference.form.address.required'),
        zipcode: yup.string().required('views.createcommerce.reference.form.zipcode.required'),
        /* order settings */
    })
    .required();
