/* react */
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
/* props */
import { CreateCommerceForm } from '../CreateCommerce.props';
/* hooks */
import { AdminLang, FieldSetProps, useAdminLang } from 'admin/core';
/* utils */
import { milesToMeters } from 'shared/utils';
/* types */
import { TypeChargeKeySymbol } from 'admin/commerces/types';
/* styles */
import { FieldStyles } from 'shared/styles';
import styles from './CreateCommerceDelivery.module.scss';

export const useCreateCommerceDelivery = () => {
    /* states */
    const {
        register,
        formState: { errors },
        watch,
    } = useFormContext<CreateCommerceForm>();

    const geolocation = useMemo(() => {
        return {
            lat: watch('geolocation.latitude') || 0,
            lng: watch('geolocation.longitude') || 0,
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch('geolocation.latitude'), watch('geolocation.longitude')]);

    const meters = milesToMeters(watch('deliveryArea') || 0);

    const { translate } = useAdminLang();

    /* props */
    const thirdPartyDeliveryField: FieldSetProps = {
        className: styles.CheckboxInverse,
        field: {
            className: errors.thirdPartyDelivery ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'checkbox',
            ...register('thirdPartyDelivery'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: translate(
                errors.thirdPartyDelivery
                    ? (errors.thirdPartyDelivery.message as AdminLang)
                    : 'createcommerce.third.hint'
            ),
            children: translate(
                errors.thirdPartyDelivery
                    ? (errors.thirdPartyDelivery.message as AdminLang)
                    : 'createcommerce.third.hint'
            ),
        },
    };
    const externalDeliveryUrlField: FieldSetProps = {
        field: {
            className: errors.externalDeliveryUrl ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            placeholder: translate('createcommerce.thirdsite.placeholder'),
            ...register('externalDeliveryUrl'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: translate(
                errors.externalDeliveryUrl
                    ? (errors.externalDeliveryUrl.message as AdminLang)
                    : 'createcommerce.thirdsite.hint'
            ),
            children: translate(
                errors.externalDeliveryUrl
                    ? (errors.externalDeliveryUrl.message as AdminLang)
                    : 'createcommerce.thirdsite.hint'
            ),
        },
    };
    const minAmountDeliveryField: FieldSetProps = {
        field: {
            className: errors.minAmountDelivery ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'decimal',
            min: 0,
            step: 0.0001,
            placeholder: translate('createcommerce.mindelivery.placeholder'),
            beforeContent: TypeChargeKeySymbol.amount,
            defaultValue: 0,
            ...register('minAmountDelivery'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: translate(
                errors.minAmountDelivery
                    ? (errors.minAmountDelivery.message as AdminLang)
                    : 'createcommerce.mindelivery.hint'
            ),
            children: translate(
                errors.minAmountDelivery
                    ? (errors.minAmountDelivery.message as AdminLang)
                    : 'createcommerce.mindelivery.hint'
            ),
        },
    };
    const deliveringzoneField: FieldSetProps = {
        className: styles.CheckboxInverse,
        field: {
            className: errors.deliveringZone ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'checkbox',
            ...register('deliveringZone'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: translate(
                errors.deliveringZone
                    ? (errors.deliveringZone.message as AdminLang)
                    : 'createcommerce.deliveryzone.hint'
            ),
            children: translate(
                errors.deliveringZone
                    ? (errors.deliveringZone.message as AdminLang)
                    : 'createcommerce.deliveryzone.hint'
            ),
        },
    };
    const deliveryAreaField: FieldSetProps = {
        field: {
            className: errors.deliveryArea ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'decimal',
            min: 0,
            step: 0.0001,
            afterContent: translate('longitude.miles'),
            placeholder: translate('createcommerce.deliveryarea.placeholder'),
            defaultValue: 0,
            ...register('deliveryArea'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: translate(
                errors.deliveryArea ? (errors.deliveryArea.message as AdminLang) : 'createcommerce.deliveryarea.hint'
            ),
            children: translate(
                errors.deliveryArea ? (errors.deliveryArea.message as AdminLang) : 'createcommerce.deliveryarea.hint'
            ),
        },
    };

    const createCommerceDeliveryFields: FieldSetProps[] = [
        thirdPartyDeliveryField,
        externalDeliveryUrlField,
        minAmountDeliveryField,
        deliveringzoneField,
        deliveryAreaField,
    ];

    return { createCommerceDeliveryFields, geolocation, meters };
};
