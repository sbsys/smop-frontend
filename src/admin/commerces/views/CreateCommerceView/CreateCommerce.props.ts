/* react */
import { BaseSyntheticEvent, MutableRefObject } from 'react';
/* props */
import { ChildrenProps } from 'shared/props';
/* types */
import {
    CountryListItemDTO,
    ExtendedServiceHours,
    Geoinformation,
    Geolocation,
    PreparationTime,
    ServicePhone,
    TypeCharge,
    TypeOrder,
} from 'admin/commerces/types';
import { TabsLayoutRef } from 'shared/layouts';
/* utils */
import * as yup from 'yup';
import { isAfter, isBefore } from 'date-fns';

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
    serviceHours: ExtendedServiceHours;
    onsitePreparationTime: PreparationTime;
    deliveryPreparationTime: PreparationTime;
    /* delivery */
    thirdPartyDelivery: boolean;
    externalDeliveryUrl: string;
    minAmountDelivery: number;
    deliveryArea: number;
    deliveringZone: boolean;
}

const serviceHours = yup.array(
    yup
        .object({
            schedules: yup.array().of(
                yup.object({
                    opening: yup
                        .string()
                        .matches(/^(\d{2}):([0-5])([0-9])$/, 'createcommerce.opening.format')
                        .test('overlap', 'createcommerce.opening.overlap', (value, schema) => {
                            return isBefore(new Date(`2020T${value}`), new Date(`2020T${schema.parent.closing}`));
                        }),
                    closing: yup
                        .string()
                        .matches(/^(\d{2}):([0-5])([0-9])$/, 'createcommerce.closing.format')
                        .test('overlap', 'createcommerce.closing.overlap', (value, schema) => {
                            return isAfter(new Date(`2020T${value}`), new Date(`2020T${schema.parent.opening}`));
                        }),
                })
            ),
        })
        .required()
);

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
                onsite: serviceHours,
                delivery: serviceHours,
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
