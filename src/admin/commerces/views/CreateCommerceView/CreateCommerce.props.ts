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
        referenceName: yup.string().required('createcommerce.name.required'),
        servicePhones: yup.array(
            yup
                .object({
                    phone: yup
                        .string()
                        .required('createcommerce.phones.required')
                        .matches(/^\+\d{3}-\d{7,8}$/, 'createcommerce.phones.format'),
                })
                .required()
        ),
        geoinformation: yup
            .object({
                country: yup.string().required('createcommerce.country.required'),
                state: yup.string().required('createcommerce.state.required'),
                city: yup.string().required('createcommerce.city.required'),
                timezone: yup.string().required('createcommerce.timezone.required'),
                gtmOffset: yup.string().required('createcommerce.gtmoffset.required'),
            })
            .required(),
        address: yup.string().required('createcommerce.address.required'),
        zipcode: yup.string().required('createcommerce.zipcode.required'),
        /* order settings */
        typeCharge: yup.array(
            yup
                .object({
                    value: yup.number().typeError('createcommerce.charge.min').min(0, 'createcommerce.charge.min'),
                })
                .required()
        ),
        applyCharge: yup
            .number()
            .typeError('createcommerce.applycharge.required')
            .required('createcommerce.applycharge.required'),
        /* attention */
        serviceHours: yup
            .object({
                onsite: yup.array(
                    yup
                        .object({
                            opening: yup.string().matches(/^(\d{2}):([0-5])([0-9])$/, 'createcommerce.opening.format'),
                            closing: yup.string().matches(/^(\d{2}):([0-5])([0-9])$/, 'createcommerce.closing.format'),
                        })
                        .required()
                ),
                delivery: yup.array(
                    yup
                        .object({
                            opening: yup.string().matches(/^(\d{2}):([0-5])([0-9])$/, 'createcommerce.opening.format'),
                            closing: yup.string().matches(/^(\d{2}):([0-5])([0-9])$/, 'createcommerce.closing.format'),
                        })
                        .required()
                ),
            })
            .required(),
        onsitePreparationTime: yup
            .object({
                hours: yup
                    .number()
                    .typeError('createcommerce.hours.min')
                    .integer('createcommerce.hours.min')
                    .min(0, 'createcommerce.hours.min')
                    .optional(),
                minutes: yup
                    .number()
                    .typeError('createcommerce.minutes.min')
                    .integer('createcommerce.minutes.min')
                    .min(0, 'createcommerce.minutes.min')
                    .max(59, 'createcommerce.minutes.max')
                    .optional(),
            })
            .required(),
        deliveryPreparationTime: yup
            .object({
                hours: yup
                    .number()
                    .typeError('createcommerce.hours.min')
                    .integer('createcommerce.hours.min')
                    .min(0, 'createcommerce.hours.min')
                    .optional(),
                minutes: yup
                    .number()
                    .typeError('createcommerce.minutes.min')
                    .integer('createcommerce.minutes.min')
                    .min(0, 'createcommerce.minutes.min')
                    .max(59, 'createcommerce.minutes.max')
                    .optional(),
            })
            .required(),
    })
    .required();
