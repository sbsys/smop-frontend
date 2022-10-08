/* react */
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
/* context */
import { useCommerceDetailContext } from '../CommerceDetail.context';
/* hooks */
import { useLoader } from 'shared/hooks';
import { FieldSetProps, useAdminNotify } from 'admin/core';
/* types */
import { TypeCharge, TypeOrder } from 'admin/commerces/types';
/* assets */
import { MdCheckCircle, MdError } from 'react-icons/md';
import { FieldStyles } from 'shared/styles';
import styles from './UpdateSetting.module.scss';
import { useEffect } from 'react';

interface UpdateSettingForm {
    orderOnline: boolean;
    typeOrder: TypeOrder[];
    typeCharge: TypeCharge[];
    applyCharge: number;
    smsAlerts: boolean;
}

export const useUpdateSetting = () => {
    /* states */
    const {
        /* states */
        commerce,
        hideUpdateSetting,
        /* functions */
        getCommerceDetail,
    } = useCommerceDetailContext();

    const {
        handleSubmit,
        reset,
        register,
        formState: { errors },
        setValue,
        watch,
        setFocus,
    } = useForm<UpdateSettingForm>();

    const { t } = useTranslation();

    const { notify } = useAdminNotify();

    const { showLoader, hideLoader } = useLoader();

    /* functions */
    const handleUpdateSetting = handleSubmit(async data => {
        showLoader();
        console.log(data);

        const service = await { error: true, message: 'Update setting', data: {} };

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

        hideUpdateSetting();

        getCommerceDetail();
    });

    const handleResetUpdateSettingForm = () => {
        reset();
    };

    /* reactivity */
    useEffect(() => {
        if (watch('typeCharge.0.enabled')) {
            setValue('typeCharge.1.enabled', false);
            setValue('typeCharge.1.value', 0);

            setFocus('typeCharge.0.value');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setValue, watch('typeCharge.0.enabled')]);

    useEffect(() => {
        if (watch('typeCharge.1.enabled')) {
            setValue('typeCharge.0.enabled', false);
            setValue('typeCharge.0.value', 0);

            setFocus('typeCharge.1.value');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setValue, watch('typeCharge.1.enabled')]);

    /* props */
    const orderOnlineField: FieldSetProps = {
        className: styles.CheckboxInverse,
        field: {
            className: errors.orderOnline ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'checkbox',
            defaultChecked: commerce?.orderOnline,
            ...register('orderOnline'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: t(
                errors.orderOnline
                    ? (errors.orderOnline.message as string)
                    : 'views.commercedetail.updatesetting.form.orderonline.hint'
            ),
            children: t(
                errors.orderOnline
                    ? (errors.orderOnline.message as string)
                    : 'views.commercedetail.updatesetting.form.orderonline.hint'
            ),
        },
    };
    const typeOrderField = (index: number): FieldSetProps => {
        const typeOrder = commerce?.typeOrder[index] as TypeOrder;

        setValue(`typeOrder.${index}.type`, typeOrder?.type);

        return {
            className: styles.Checkbox,
            field: {
                className:
                    errors.typeOrder && errors.typeOrder[index]
                        ? FieldStyles.OutlineDanger
                        : FieldStyles.OutlinePrimary,
                strategy: 'checkbox',
                defaultChecked: typeOrder?.enabled,
                ...register(`typeOrder.${index}.enabled`),
            },
            isHintReserved: true,
            hint: {
                hasDots: true,
                title: t(
                    errors.typeOrder && errors.typeOrder[index]
                        ? (errors.typeOrder[index]?.message as string)
                        : `views.commercedetail.updatesetting.form.typeorder.${typeOrder?.type}`
                ),
                children: t(
                    errors.typeOrder && errors.typeOrder[index]
                        ? (errors.typeOrder[index]?.message as string)
                        : `views.commercedetail.updatesetting.form.typeorder.${typeOrder?.type}`
                ),
            },
        };
    };

    const typeChargeField = (index: number): FieldSetProps[] => {
        const typeCharge = commerce?.typeCharge[index] as TypeCharge;

        setValue(`typeCharge.${index}.type`, typeCharge?.type);
        setValue(`typeCharge.${index}.symbol`, typeCharge?.symbol);

        return [
            {
                className: styles.CheckboxInverse,
                field: {
                    className:
                        errors.typeCharge && errors.typeCharge[index]
                            ? FieldStyles.OutlineDanger
                            : FieldStyles.OutlinePrimary,
                    strategy: 'checkbox',
                    defaultChecked: typeCharge?.enabled,
                    ...register(`typeCharge.${index}.enabled`),
                },
                isHintReserved: true,
                hint: {
                    hasDots: true,
                    title: t(
                        errors.typeCharge && errors.typeCharge[index]
                            ? (errors.typeCharge[index]?.message as string)
                            : `views.commercedetail.updatesetting.form.typecharge.${typeCharge?.type}.title`
                    ),
                    children: t(
                        errors.typeCharge && errors.typeCharge[index]
                            ? (errors.typeCharge[index]?.message as string)
                            : `views.commercedetail.updatesetting.form.typecharge.${typeCharge?.type}.title`
                    ),
                },
            },
            {
                disabled: !watch(`typeCharge.${index}.enabled`),
                field: {
                    className:
                        errors.typeCharge && errors.typeCharge[index]
                            ? FieldStyles.OutlineDanger
                            : FieldStyles.OutlinePrimary,
                    placeholder: t(
                        `views.commercedetail.updatesetting.form.typecharge.${typeCharge?.type}.placeholder`
                    ),
                    strategy: 'decimal',
                    min: 0,
                    step: 0.0001,
                    beforeContent: typeCharge?.symbol,
                    defaultValue: typeCharge?.value,
                    ...register(`typeCharge.${index}.value`),
                },
                isHintReserved: true,
                hint: {
                    hasDots: true,
                    title: t(
                        errors.typeCharge && errors.typeCharge[index]
                            ? (errors.typeCharge[index]?.message as string)
                            : `views.commercedetail.updatesetting.form.typecharge.${typeCharge?.type}.hint`
                    ),
                    children: t(
                        errors.typeCharge && errors.typeCharge[index]
                            ? (errors.typeCharge[index]?.message as string)
                            : `views.commercedetail.updatesetting.form.typecharge.${typeCharge?.type}.hint`
                    ),
                },
            },
        ];
    };

    const applyChargeField: FieldSetProps = {
        field: {
            className: errors.applyCharge ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            placeholder: t('views.commercedetail.updatesetting.form.applycharge.placeholder'),
            strategy: 'select',
            options: [
                {
                    label: t('views.commercedetail.updatesetting.form.applycharge.before'),
                    value: 1,
                },
                {
                    label: t('views.commercedetail.updatesetting.form.applycharge.after'),
                    value: 0,
                },
            ],
            defaultValue: commerce?.applyCharge,
            ...register('applyCharge'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: t(
                errors.applyCharge
                    ? (errors.applyCharge.message as string)
                    : `views.commercedetail.updatesetting.form.applycharge.hint`
            ),
            children: t(
                errors.applyCharge
                    ? (errors.applyCharge.message as string)
                    : `views.commercedetail.updatesetting.form.applycharge.hint`
            ),
        },
    };
    const smsAlertsField: FieldSetProps = {
        className: styles.CheckboxInverse,
        field: {
            className: errors.smsAlerts ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'checkbox',
            defaultChecked: commerce?.smsAlerts,
            ...register('smsAlerts'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: t(
                errors.smsAlerts
                    ? (errors.smsAlerts.message as string)
                    : 'views.commercedetail.updatesetting.form.smsalerts.hint'
            ),
            children: t(
                errors.smsAlerts
                    ? (errors.smsAlerts.message as string)
                    : 'views.commercedetail.updatesetting.form.smsalerts.hint'
            ),
        },
    };

    const updateSettingFormFields: FieldSetProps[] = [
        orderOnlineField,
        ...[...Array(commerce?.typeOrder.length)].map((_, index) => typeOrderField(index)),
        ...[...Array(commerce?.typeCharge.length)]
            .map((_, index) => typeChargeField(index))
            .reduce((prev, current) => [...prev, ...current]),
        applyChargeField,
        smsAlertsField,
    ];

    return { handleUpdateSetting, handleResetUpdateSettingForm, updateSettingFormFields };
};
