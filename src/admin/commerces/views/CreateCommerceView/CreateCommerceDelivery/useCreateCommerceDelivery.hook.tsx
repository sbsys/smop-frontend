/* react */
import { FieldSetProps } from 'admin/core';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
/* props */
import { CreateCommerceForm } from '../CreateCommerce.props';
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
    } = useFormContext<CreateCommerceForm>();

    const { t } = useTranslation();

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
            title: t(
                errors.thirdPartyDelivery
                    ? (errors.thirdPartyDelivery.message as string)
                    : 'views.createcommerce.delivery.form.thirdpartydelivery.hint'
            ),
            children: t(
                errors.thirdPartyDelivery
                    ? (errors.thirdPartyDelivery.message as string)
                    : 'views.createcommerce.delivery.form.thirdpartydelivery.hint'
            ),
        },
    };
    const externalDeliveryUrlField: FieldSetProps = {
        field: {
            className: errors.externalDeliveryUrl ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            placeholder: t('views.createcommerce.delivery.form.externaldeliveryurl.placeholder'),
            ...register('externalDeliveryUrl'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: t(
                errors.externalDeliveryUrl
                    ? (errors.externalDeliveryUrl.message as string)
                    : 'views.createcommerce.delivery.form.externaldeliveryurl.hint'
            ),
            children: t(
                errors.externalDeliveryUrl
                    ? (errors.externalDeliveryUrl.message as string)
                    : 'views.createcommerce.delivery.form.externaldeliveryurl.hint'
            ),
        },
    };
    const minAmountDeliveryField: FieldSetProps = {
        field: {
            className: errors.minAmountDelivery ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'decimal',
            min: 0,
            step: 0.0001,
            placeholder: t('views.createcommerce.delivery.form.minamountdelivery.placeholder'),
            beforeContent: TypeChargeKeySymbol.amount,
            ...register('minAmountDelivery'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: t(
                errors.minAmountDelivery
                    ? (errors.minAmountDelivery.message as string)
                    : 'views.createcommerce.delivery.form.minamountdelivery.hint'
            ),
            children: t(
                errors.minAmountDelivery
                    ? (errors.minAmountDelivery.message as string)
                    : 'views.createcommerce.delivery.form.minamountdelivery.hint'
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
            title: t(
                errors.deliveringZone
                    ? (errors.deliveringZone.message as string)
                    : 'views.createcommerce.delivery.form.deliveringzone.hint'
            ),
            children: t(
                errors.deliveringZone
                    ? (errors.deliveringZone.message as string)
                    : 'views.createcommerce.delivery.form.deliveringzone.hint'
            ),
        },
    };
    const deliveryAreaField: FieldSetProps = {
        field: {
            className: errors.deliveryArea ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'decimal',
            min: 0,
            step: 0.0001,
            afterContent: t('longitude.miles'),
            placeholder: t('views.createcommerce.delivery.form.deliveryarea.placeholder'),
            ...register('deliveryArea'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: t(
                errors.deliveryArea
                    ? (errors.deliveryArea.message as string)
                    : 'views.createcommerce.delivery.form.deliveryarea.hint'
            ),
            children: t(
                errors.deliveryArea
                    ? (errors.deliveryArea.message as string)
                    : 'views.createcommerce.delivery.form.deliveryarea.hint'
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

    return { createCommerceDeliveryFields };
};
