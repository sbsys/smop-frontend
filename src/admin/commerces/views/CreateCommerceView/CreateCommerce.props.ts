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
                        .required('views.createcommerce.reference.form.servicephones.required')
                        .matches(/^\+\d{3}-\d{7,8}$/, 'views.createcommerce.reference.form.servicephones.format'),
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
        typeCharge: yup.array(
            yup
                .object({
                    value: yup
                        .number()
                        .typeError('views.createcommerce.setting.form.typecharge.cero')
                        .min(0, 'views.createcommerce.setting.form.typecharge.cero'),
                })
                .required()
        ),
        applyCharge: yup
            .number()
            .typeError('views.createcommerce.setting.form.applycharge.required')
            .required('views.createcommerce.setting.form.applycharge.required'),
        /* attention */
        serviceHours: yup
            .object({
                onsite: yup.array(
                    yup
                        .object({
                            opening: yup
                                .string()
                                .matches(
                                    /^(\d{2}):([0-5])([0-9])$/,
                                    'views.createcommerce.attention.form.servicehours.onsite.opening.format'
                                ),
                            closing: yup
                                .string()
                                .matches(
                                    /^(\d{2}):([0-5])([0-9])$/,
                                    'views.createcommerce.attention.form.servicehours.onsite.closing.format'
                                ),
                        })
                        .required()
                ),
                delivery: yup.array(
                    yup
                        .object({
                            opening: yup
                                .string()
                                .matches(
                                    /^(\d{2}):([0-5])([0-9])$/,
                                    'views.createcommerce.attention.form.servicehours.delivery.opening.format'
                                ),
                            closing: yup
                                .string()
                                .matches(
                                    /^(\d{2}):([0-5])([0-9])$/,
                                    'views.createcommerce.attention.form.servicehours.delivery.closing.format'
                                ),
                        })
                        .required()
                ),
            })
            .required(),
        onsitePreparationTime: yup
            .object({
                hours: yup
                    .number()
                    .typeError('views.createcommerce.attention.form.onsitepreparationtime.hours.min')
                    .integer('views.createcommerce.attention.form.onsitepreparationtime.hours.min')
                    .min(0, 'views.createcommerce.attention.form.onsitepreparationtime.hours.min')
                    .optional(),
                minutes: yup
                    .number()
                    .typeError('views.createcommerce.attention.form.onsitepreparationtime.minutes.min')
                    .integer('views.createcommerce.attention.form.onsitepreparationtime.minutes.min')
                    .min(0, 'views.createcommerce.attention.form.onsitepreparationtime.minutes.min')
                    .max(59, 'views.createcommerce.attention.form.onsitepreparationtime.minutes.max')
                    .optional(),
            })
            .required(),
        deliveryPreparationTime: yup
            .object({
                hours: yup
                    .number()
                    .typeError('views.createcommerce.attention.form.deliverypreparationtime.hours.min')
                    .integer('views.createcommerce.attention.form.deliverypreparationtime.hours.min')
                    .min(0, 'views.createcommerce.attention.form.deliverypreparationtime.hours.min')
                    .optional(),
                minutes: yup
                    .number()
                    .typeError('views.createcommerce.attention.form.deliverypreparationtime.minutes.min')
                    .integer('views.createcommerce.attention.form.deliverypreparationtime.minutes.min')
                    .min(0, 'views.createcommerce.attention.form.deliverypreparationtime.minutes.min')
                    .max(59, 'views.createcommerce.attention.form.deliverypreparationtime.minutes.max')
                    .optional(),
            })
            .required(),
    })
    .required();
