/* react */
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
/* context */
import { useCommerceDetailContext } from '../CommerceDetail.context';
/* hooks */
import { useLoader } from 'shared/hooks';
import { AdminLang, FieldSetProps, useAdminLang, useAdminNotify } from 'admin/core';
/* types */
import { TypeCharge, TypeOrder } from 'admin/commerces/types';
/* services */
import { updateSettingService } from 'admin/commerces/services';
/* utils */
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
/* assets */
import { MdCheckCircle, MdError } from 'react-icons/md';
/* styles */
import { FieldStyles } from 'shared/styles';
import styles from './UpdateSetting.module.scss';

export interface UpdateSettingForm {
    orderOnline: boolean;
    typeOrder: TypeOrder[];
    typeCharge: TypeCharge[];
    applyCharge: number;
    smsAlerts: boolean;
}

export const UpdateSettingSchema = yup
    .object({
        typeCharge: yup.array(
            yup
                .object({
                    value: yup.number().typeError('commerceedit.charge.min').min(0, 'commerceedit.charge.min'),
                })
                .required()
        ),
        applyCharge: yup
            .number()
            .typeError('commerceedit.applycharge.required')
            .required('commerceedit.applycharge.required'),
    })
    .required();

export const useUpdateSetting = () => {
    /* states */
    const {
        /* states */
        commerce,
        isUpdateSetting,
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
        trigger,
    } = useForm<UpdateSettingForm>({
        mode: 'all',
        resolver: yupResolver(UpdateSettingSchema),
    });

    const { translate } = useAdminLang();

    const { notify } = useAdminNotify();

    const { showLoader, hideLoader } = useLoader();

    /* functions */
    const handleUpdateSetting = handleSubmit(async data => {
        showLoader();

        const service = await updateSettingService(commerce?.commerceId ?? '', data);

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
        if (!isUpdateSetting) return;

        if (!commerce) return;

        commerce.typeOrder.forEach((order, index) => setValue(`typeOrder.${index}.enabled`, order.enabled));
    }, [commerce, isUpdateSetting, setValue]);

    useEffect(() => {
        if (watch('typeCharge.0.enabled')) {
            setValue('typeCharge.1.enabled', false);
            setValue('typeCharge.1.value', 0);

            setFocus('typeCharge.0.value');
        } else {
            setValue('typeCharge.0.value', 0);
        }

        trigger();
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

        trigger();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setValue, watch('typeCharge.1.enabled')]);

    useEffect(() => {
        if (isUpdateSetting) {
            setValue('typeOrder.0.enabled', commerce?.typeOrder[0].enabled ?? false);
            setValue('typeOrder.1.enabled', commerce?.typeOrder[1].enabled ?? false);
            trigger();
        }
    }, [commerce?.typeOrder, isUpdateSetting, setValue, trigger]);

    /* props */
    const orderOnlineField: FieldSetProps = {
        className: styles.CheckboxInverse,
        field: {
            strategy: 'checkbox',
            defaultChecked: commerce?.orderOnline,
            ...register('orderOnline'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: translate(
                errors.orderOnline ? (errors.orderOnline.message as AdminLang) : 'commerceedit.online.hint'
            ),
            children: translate(
                errors.orderOnline ? (errors.orderOnline.message as AdminLang) : 'commerceedit.online.hint'
            ),
        },
    };
    const typeOrderField = (index: number): FieldSetProps => {
        const typeOrder = commerce?.typeOrder[index] as TypeOrder;

        setValue(`typeOrder.${index}.type`, typeOrder?.type);

        return {
            className: styles.Checkbox,
            field: {
                strategy: 'checkbox',
                ...register(`typeOrder.${index}.enabled`),
            },
            isHintReserved: true,
            hint: {
                hasDots: true,
                title: translate(
                    errors.typeOrder && errors.typeOrder[index]
                        ? (errors.typeOrder[index]?.message as AdminLang)
                        : `ordertypes.${typeOrder?.type}`
                ),
                children: translate(
                    errors.typeOrder && errors.typeOrder[index]
                        ? (errors.typeOrder[index]?.message as AdminLang)
                        : `ordertypes.${typeOrder?.type}`
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
                    strategy: 'checkbox',
                    defaultChecked: typeCharge?.enabled,
                    ...register(`typeCharge.${index}.enabled`),
                },
                isHintReserved: true,
                hint: {
                    hasDots: true,
                    title: translate(
                        errors.typeCharge && errors.typeCharge[index]?.enabled
                            ? (errors.typeCharge[index]?.enabled?.message as AdminLang)
                            : `commerceedit.${typeCharge?.type}charge.title`
                    ),
                    children: translate(
                        errors.typeCharge && errors.typeCharge[index]?.enabled
                            ? (errors.typeCharge[index]?.enabled?.message as AdminLang)
                            : `commerceedit.${typeCharge?.type}charge.title`
                    ),
                },
            },
            {
                disabled: !watch(`typeCharge.${index}.enabled`),
                field: {
                    className:
                        errors.typeCharge && errors.typeCharge[index]?.value
                            ? FieldStyles.OutlineDanger
                            : FieldStyles.OutlinePrimary,
                    placeholder: translate(`commerceedit.${typeCharge?.type}charge.placeholder`),
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
                    title: translate(
                        errors.typeCharge && errors.typeCharge[index]?.value
                            ? (errors.typeCharge[index]?.value?.message as AdminLang)
                            : `commerceedit.${typeCharge?.type}charge.hint`
                    ),
                    children: translate(
                        errors.typeCharge && errors.typeCharge[index]
                            ? (errors.typeCharge[index]?.value?.message as AdminLang)
                            : `commerceedit.${typeCharge?.type}charge.hint`
                    ),
                },
            },
        ];
    };

    const applyChargeField: FieldSetProps = {
        field: {
            className: errors.applyCharge ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            placeholder: translate('commerceedit.applycharge.placeholder'),
            strategy: 'select',
            options: [
                {
                    label: translate('applycharge.1'),
                    value: 1,
                },
                {
                    label: translate('applycharge.0'),
                    value: 0,
                },
            ],
            defaultValue: commerce?.applyCharge,
            ...register('applyCharge'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: translate(
                errors.applyCharge ? (errors.applyCharge.message as AdminLang) : `commerceedit.applycharge.hint`
            ),
            children: translate(
                errors.applyCharge ? (errors.applyCharge.message as AdminLang) : `commerceedit.applycharge.hint`
            ),
        },
    };
    const smsAlertsField: FieldSetProps = {
        className: styles.CheckboxInverse,
        field: {
            strategy: 'checkbox',
            defaultChecked: commerce?.smsAlerts,
            ...register('smsAlerts'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: translate(errors.smsAlerts ? (errors.smsAlerts.message as AdminLang) : 'commerceedit.sms.hint'),
            children: translate(errors.smsAlerts ? (errors.smsAlerts.message as AdminLang) : 'commerceedit.sms.hint'),
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
