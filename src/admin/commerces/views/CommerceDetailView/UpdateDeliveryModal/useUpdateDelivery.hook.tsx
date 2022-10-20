/* react */
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
/* context */
import { useCommerceDetailContext } from '../CommerceDetail.context';
/* hooks */
import { useLoader } from 'shared/hooks';
import { FieldSetProps, useAdminNotify } from 'admin/core';
/* utils */
import { milesToMeters } from 'shared/utils';
/* types */
import { TypeChargeKeySymbol } from 'admin/commerces/types';
/* services */
import { updateDeliveryService } from 'admin/commerces/services';
/* assets */
import { MdCheckCircle, MdError } from 'react-icons/md';
/* styles */
import { FieldStyles } from 'shared/styles';
import styles from './UpdateDelivery.module.scss';
import { useEffect } from 'react';

export interface UpdateDeliveryForm {
    thirdPartyDelivery: boolean;
    externalDeliveryUrl: string;
    minAmountDelivery: string;
    deliveryArea: string;
    deliveringZone: boolean;
}

export const useUpdateDelivery = () => {
    /* states */
    const {
        /* states */
        commerce,
        isUpdateDelivery,
        hideUpdateDelivery,
        /* functions */
        getCommerceDetail,
    } = useCommerceDetailContext();

    const {
        handleSubmit,
        reset,
        register,
        formState: { errors },
        watch,
        setValue,
    } = useForm<UpdateDeliveryForm>();

    const { t } = useTranslation();

    const { notify } = useAdminNotify();

    const { showLoader, hideLoader } = useLoader();

    /* functions */
    const handleUpdateDelivery = handleSubmit(async data => {
        showLoader();

        const service = await updateDeliveryService(commerce?.commerceId ?? '', data);

        hideLoader();

        if (service.error)
            return notify('danger', {
                title: 'Error',
                icon: <MdError />,
                timestamp: new Date(),
                text: service.message,
            });

        notify('success', {
            title: 'Success',
            icon: <MdCheckCircle />,
            timestamp: new Date(),
            text: service.message,
        });

        hideUpdateDelivery();

        getCommerceDetail();
    });

    const handleResetUpdateDeliveryForm = () => {
        reset();
    };

    /* reactivity */
    useEffect(() => {
        if (isUpdateDelivery) setValue('deliveryArea', commerce?.deliveryArea ?? '0');
    }, [commerce?.deliveryArea, isUpdateDelivery, setValue]);

    /* props */
    const thirdPartyDeliveryField: FieldSetProps = {
        className: styles.CheckboxInverse,
        field: {
            className: errors.thirdPartyDelivery ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'checkbox',
            defaultChecked: commerce?.thirdPartyDelivery,
            ...register('thirdPartyDelivery'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: t(
                errors.thirdPartyDelivery
                    ? (errors.thirdPartyDelivery.message as string)
                    : 'views.commercedetail.updatedelivery.form.thirdpartydelivery.hint'
            ),
            children: t(
                errors.thirdPartyDelivery
                    ? (errors.thirdPartyDelivery.message as string)
                    : 'views.commercedetail.updatedelivery.form.thirdpartydelivery.hint'
            ),
        },
    };
    const externalDeliveryUrlField: FieldSetProps = {
        field: {
            className: errors.externalDeliveryUrl ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            placeholder: t('views.commercedetail.updatedelivery.form.externaldeliveryurl.placeholder'),
            defaultValue: commerce?.externalDeliveryUrl,
            ...register('externalDeliveryUrl'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: t(
                errors.externalDeliveryUrl
                    ? (errors.externalDeliveryUrl.message as string)
                    : 'views.commercedetail.updatedelivery.form.externaldeliveryurl.hint'
            ),
            children: t(
                errors.externalDeliveryUrl
                    ? (errors.externalDeliveryUrl.message as string)
                    : 'views.commercedetail.updatedelivery.form.externaldeliveryurl.hint'
            ),
        },
    };
    const minAmountDeliveryField: FieldSetProps = {
        field: {
            className: errors.minAmountDelivery ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'decimal',
            min: 0,
            step: 0.0001,
            placeholder: t('views.commercedetail.updatedelivery.form.minamountdelivery.placeholder'),
            beforeContent: TypeChargeKeySymbol.amount,
            defaultValue: commerce?.minAmountDelivery,
            ...register('minAmountDelivery'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: t(
                errors.minAmountDelivery
                    ? (errors.minAmountDelivery.message as string)
                    : 'views.commercedetail.updatedelivery.form.minamountdelivery.hint'
            ),
            children: t(
                errors.minAmountDelivery
                    ? (errors.minAmountDelivery.message as string)
                    : 'views.commercedetail.updatedelivery.form.minamountdelivery.hint'
            ),
        },
    };
    const deliveringzoneField: FieldSetProps = {
        className: styles.CheckboxInverse,
        field: {
            className: errors.deliveringZone ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'checkbox',
            defaultChecked: commerce?.deliveringZone,
            ...register('deliveringZone'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: t(
                errors.deliveringZone
                    ? (errors.deliveringZone.message as string)
                    : 'views.commercedetail.updatedelivery.form.deliveringzone.hint'
            ),
            children: t(
                errors.deliveringZone
                    ? (errors.deliveringZone.message as string)
                    : 'views.commercedetail.updatedelivery.form.deliveringzone.hint'
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
            placeholder: t('views.commercedetail.updatedelivery.form.deliveryarea.placeholder'),
            ...register('deliveryArea'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: t(
                errors.deliveryArea
                    ? (errors.deliveryArea.message as string)
                    : 'views.commercedetail.updatedelivery.form.deliveryarea.hint'
            ),
            children: t(
                errors.deliveryArea
                    ? (errors.deliveryArea.message as string)
                    : 'views.commercedetail.updatedelivery.form.deliveryarea.hint'
            ),
        },
    };

    const meters = milesToMeters(Number.parseFloat(watch('deliveryArea') || '0'));

    const updateDeliveryFormFields: FieldSetProps[] = [
        thirdPartyDeliveryField,
        externalDeliveryUrlField,
        minAmountDeliveryField,
        deliveringzoneField,
        deliveryAreaField,
    ];

    return { handleUpdateDelivery, handleResetUpdateDeliveryForm, updateDeliveryFormFields, meters };
};
