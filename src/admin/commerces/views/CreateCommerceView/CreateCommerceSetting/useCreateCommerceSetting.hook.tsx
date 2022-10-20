/* react */
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
/* props */
import { FieldSetProps } from 'admin/core';
import { CreateCommerceForm } from '../CreateCommerce.props';
/* types */
import { TypeChargeValue, TypeOrderValue } from 'admin/commerces/types';
/* styles */
import { FieldStyles } from 'shared/styles';
import styles from './CreateCommerceSetting.module.scss';

export const useCreateCommerceSetting = () => {
    /* states */
    const {
        register,
        setValue,
        formState: { errors },
        watch,
        setFocus,
        trigger,
    } = useFormContext<CreateCommerceForm>();

    const { t } = useTranslation();

    /* reactivity */
    useEffect(() => {
        if (watch('typeCharge.0.enabled')) {
            setValue('typeCharge.1.enabled', false);
            setValue('typeCharge.1.value', 0);

            setFocus('typeCharge.0.value');
        } else {
            setValue('typeCharge.0.value', 0);
        }

        trigger(['typeCharge.0.value', 'typeCharge.1.value']);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setValue, watch('typeCharge.0.enabled')]);

    useEffect(() => {
        if (watch('typeCharge.1.enabled')) {
            setValue('typeCharge.0.enabled', false);
            setValue('typeCharge.0.value', 0);

            setFocus('typeCharge.1.value');
        } else {
            setValue('typeCharge.1.value', 0);
        }

        trigger(['typeCharge.0.value', 'typeCharge.1.value']);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setValue, watch('typeCharge.1.enabled')]);

    /* props */
    const orderOnlineField: FieldSetProps = {
        className: styles.CheckboxInverse,
        field: {
            className: errors.orderOnline ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'checkbox',
            ...register('orderOnline'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: t(
                errors.orderOnline
                    ? (errors.orderOnline.message as string)
                    : 'views.createcommerce.setting.form.orderonline.hint'
            ),
            children: t(
                errors.orderOnline
                    ? (errors.orderOnline.message as string)
                    : 'views.createcommerce.setting.form.orderonline.hint'
            ),
        },
    };
    const typeOrderField = (index: number): FieldSetProps => {
        const typeOrder = TypeOrderValue[index];

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
                        : `views.createcommerce.setting.form.typeorder.${typeOrder?.type}`
                ),
                children: t(
                    errors.typeOrder && errors.typeOrder[index]
                        ? (errors.typeOrder[index]?.message as string)
                        : `views.createcommerce.setting.form.typeorder.${typeOrder?.type}`
                ),
            },
        };
    };

    const typeChargeField = (index: number): FieldSetProps[] => {
        const typeCharge = TypeChargeValue[index];

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
                        errors.typeCharge && errors.typeCharge[index]?.enabled
                            ? (errors.typeCharge[index]?.enabled?.message as string)
                            : `views.createcommerce.setting.form.typecharge.${typeCharge?.type}.title`
                    ),
                    children: t(
                        errors.typeCharge && errors.typeCharge[index]?.enabled
                            ? (errors.typeCharge[index]?.enabled?.message as string)
                            : `views.createcommerce.setting.form.typecharge.${typeCharge?.type}.title`
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
                    placeholder: t(`views.createcommerce.setting.form.typecharge.${typeCharge?.type}.placeholder`),
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
                        errors.typeCharge && errors.typeCharge[index]?.value
                            ? (errors.typeCharge[index]?.value?.message as string)
                            : `views.createcommerce.setting.form.typecharge.${typeCharge?.type}.hint`
                    ),
                    children: t(
                        errors.typeCharge && errors.typeCharge[index]
                            ? (errors.typeCharge[index]?.value?.message as string)
                            : `views.createcommerce.setting.form.typecharge.${typeCharge?.type}.hint`
                    ),
                },
            },
        ];
    };

    const applyChargeField: FieldSetProps = {
        field: {
            className: errors.applyCharge ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            placeholder: t('views.createcommerce.setting.form.applycharge.placeholder'),
            strategy: 'select',
            options: [
                {
                    label: t('views.createcommerce.setting.form.applycharge.before'),
                    value: 1,
                },
                {
                    label: t('views.createcommerce.setting.form.applycharge.after'),
                    value: 0,
                },
            ],
            ...register('applyCharge'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: t(
                errors.applyCharge
                    ? (errors.applyCharge.message as string)
                    : `views.createcommerce.setting.form.applycharge.hint`
            ),
            children: t(
                errors.applyCharge
                    ? (errors.applyCharge.message as string)
                    : `views.createcommerce.setting.form.applycharge.hint`
            ),
        },
    };
    const smsAlertsField: FieldSetProps = {
        className: styles.CheckboxInverse,
        field: {
            className: errors.smsAlerts ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'checkbox',
            ...register('smsAlerts'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: t(
                errors.smsAlerts
                    ? (errors.smsAlerts.message as string)
                    : 'views.createcommerce.setting.form.smsalerts.hint'
            ),
            children: t(
                errors.smsAlerts
                    ? (errors.smsAlerts.message as string)
                    : 'views.createcommerce.setting.form.smsalerts.hint'
            ),
        },
    };

    const createCommerceSettingFields: FieldSetProps[] = [
        orderOnlineField,
        ...[...Array(TypeOrderValue.length)].map((_, index) => typeOrderField(index)),
        ...[...Array(TypeChargeValue.length)]
            .map((_, index) => typeChargeField(index))
            .reduce((prev, current) => [...prev, ...current]),
        applyChargeField,
        smsAlertsField,
    ];

    return { createCommerceSettingFields };
};
