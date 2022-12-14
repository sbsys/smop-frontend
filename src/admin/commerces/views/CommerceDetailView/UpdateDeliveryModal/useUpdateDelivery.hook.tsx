/* react */
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
/* context */
import { useCommerceDetailContext } from '../CommerceDetail.context';
/* hooks */
import { useLoader } from 'shared/hooks';
import { AdminLang, FieldSetProps, useAdminLang, useAdminNotify } from 'admin/core';
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

    const { translate } = useAdminLang();

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
            strategy: 'checkbox',
            defaultChecked: commerce?.thirdPartyDelivery,
            ...register('thirdPartyDelivery'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: translate(
                errors.thirdPartyDelivery ? (errors.thirdPartyDelivery.message as AdminLang) : 'commerceedit.third.hint'
            ),
            children: translate(
                errors.thirdPartyDelivery ? (errors.thirdPartyDelivery.message as AdminLang) : 'commerceedit.third.hint'
            ),
        },
    };
    const externalDeliveryUrlField: FieldSetProps = {
        field: {
            className: errors.externalDeliveryUrl ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            placeholder: translate('commerceedit.thirdsite.placeholder'),
            defaultValue: commerce?.externalDeliveryUrl,
            ...register('externalDeliveryUrl'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: translate(
                errors.externalDeliveryUrl
                    ? (errors.externalDeliveryUrl.message as AdminLang)
                    : 'commerceedit.thirdsite.hint'
            ),
            children: translate(
                errors.externalDeliveryUrl
                    ? (errors.externalDeliveryUrl.message as AdminLang)
                    : 'commerceedit.thirdsite.hint'
            ),
        },
    };
    const minAmountDeliveryField: FieldSetProps = {
        field: {
            className: errors.minAmountDelivery ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'decimal',
            min: 0,
            step: 0.0001,
            placeholder: translate('commerceedit.mindelivery.placeholder'),
            beforeContent: TypeChargeKeySymbol.amount,
            defaultValue: commerce?.minAmountDelivery,
            ...register('minAmountDelivery'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: translate(
                errors.minAmountDelivery
                    ? (errors.minAmountDelivery.message as AdminLang)
                    : 'commerceedit.mindelivery.hint'
            ),
            children: translate(
                errors.minAmountDelivery
                    ? (errors.minAmountDelivery.message as AdminLang)
                    : 'commerceedit.mindelivery.hint'
            ),
        },
    };
    const deliveringzoneField: FieldSetProps = {
        className: styles.CheckboxInverse,
        field: {
            strategy: 'checkbox',
            defaultChecked: commerce?.deliveringZone,
            ...register('deliveringZone'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: translate(
                errors.deliveringZone ? (errors.deliveringZone.message as AdminLang) : 'commerceedit.deliveryzone.hint'
            ),
            children: translate(
                errors.deliveringZone ? (errors.deliveringZone.message as AdminLang) : 'commerceedit.deliveryzone.hint'
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
            placeholder: translate('commerceedit.deliveryarea.placeholder'),
            ...register('deliveryArea'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: translate(
                errors.deliveryArea ? (errors.deliveryArea.message as AdminLang) : 'commerceedit.deliveryarea.hint'
            ),
            children: translate(
                errors.deliveryArea ? (errors.deliveryArea.message as AdminLang) : 'commerceedit.deliveryarea.hint'
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
