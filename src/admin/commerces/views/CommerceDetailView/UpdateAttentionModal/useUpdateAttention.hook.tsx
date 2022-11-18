/* react */
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
/* context */
import { useCommerceDetailContext } from '../CommerceDetail.context';
/* hooks */
import { useLoader } from 'shared/hooks';
import { AdminLang, FieldSetProps, useAdminLang, useAdminNotify, WeekDay } from 'admin/core';
/* services */
import { updateAttentionService } from 'admin/commerces/services';
/* utils */
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
/* types */
import { DayService, DayServiceValue, PreparationTime, ServiceHours } from 'admin/commerces/types';
/* assets */
import { MdCheckCircle, MdError } from 'react-icons/md';
/* styles */
import { FieldStyles } from 'shared/styles';
import styles from './UpdateAttention.module.scss';

export interface UpdateAttentionForm {
    serviceHours: ServiceHours;
    onsitePreparationTime: PreparationTime;
    deliveryPreparationTime: PreparationTime;
}

export const UpdateAttentionSchema = yup
    .object({
        serviceHours: yup
            .object({
                onsite: yup.array(
                    yup
                        .object({
                            opening: yup.string().matches(/^(\d{2}):([0-5])([0-9])$/, 'commerceedit.opening.format'),
                            closing: yup.string().matches(/^(\d{2}):([0-5])([0-9])$/, 'commerceedit.closing.format'),
                        })
                        .required()
                ),
                delivery: yup.array(
                    yup
                        .object({
                            opening: yup.string().matches(/^(\d{2}):([0-5])([0-9])$/, 'commerceedit.opening.format'),
                            closing: yup.string().matches(/^(\d{2}):([0-5])([0-9])$/, 'commerceedit.closing.format'),
                        })
                        .required()
                ),
            })
            .required(),
        onsitePreparationTime: yup
            .object({
                hours: yup
                    .number()
                    .typeError('commerceedit.hours.min')
                    .integer('commerceedit.hours.min')
                    .min(0, 'commerceedit.hours.min')
                    .optional(),
                minutes: yup
                    .number()
                    .typeError('commerceedit.minutes.min')
                    .integer('commerceedit.minutes.min')
                    .min(0, 'commerceedit.minutes.min')
                    .max(59, 'commerceedit.minutes.max')
                    .optional(),
            })
            .required(),
        deliveryPreparationTime: yup
            .object({
                hours: yup
                    .number()
                    .typeError('commerceedit.hours.min')
                    .integer('commerceedit.hours.min')
                    .min(0, 'commerceedit.hours.min')
                    .optional(),
                minutes: yup
                    .number()
                    .typeError('commerceedit.minutes.min')
                    .integer('commerceedit.minutes.min')
                    .min(0, 'commerceedit.minutes.min')
                    .max(59, 'commerceedit.minutes.max')
                    .optional(),
            })
            .required(),
    })
    .required();

export const useUpdateAttention = () => {
    /* states */
    const {
        /* states */
        commerce,
        isUpdateAttention,
        hideUpdateAttention,
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
        trigger,
    } = useForm<UpdateAttentionForm>({
        mode: 'all',
        resolver: yupResolver(UpdateAttentionSchema),
    });

    const { translate } = useAdminLang();

    const { notify } = useAdminNotify();

    const { showLoader, hideLoader } = useLoader();

    /* functions */
    const handleUpdateAttention = handleSubmit(async data => {
        showLoader();

        const service = await updateAttentionService(commerce?.commerceId ?? '', data);

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

        hideUpdateAttention();

        getCommerceDetail();
    });

    const handleResetUpdateAttentionForm = () => {
        reset();
    };

    const handleRepeatSunday = async (attention: 'onsite' | 'delivery') => {
        if (
            !(await trigger([`serviceHours.${attention}.0.opening`, `serviceHours.${attention}.0.closing`], {
                shouldFocus: true,
            }))
        )
            return;

        [...Array(DayServiceValue.length - 1)].forEach((_, index) => {
            setValue(`serviceHours.${attention}.${index + 1}.enabled`, watch(`serviceHours.${attention}.0.enabled`));
            setValue(`serviceHours.${attention}.${index + 1}.opening`, watch(`serviceHours.${attention}.0.opening`));
            setValue(`serviceHours.${attention}.${index + 1}.closing`, watch(`serviceHours.${attention}.0.closing`));
        });
    };

    /* reactivity */
    useEffect(() => {
        if (isUpdateAttention) {
            commerce?.serviceHours.onsite.forEach((onsite, index) => {
                setValue(`serviceHours.onsite.${index}.enabled`, onsite.enabled);
            });

            commerce?.serviceHours.delivery.forEach((delivery, index) => {
                setValue(`serviceHours.delivery.${index}.enabled`, delivery.enabled);
            });
        }
    }, [commerce?.serviceHours.delivery, commerce?.serviceHours.onsite, isUpdateAttention, setValue]);

    /* props */
    const serviceHoursOnsiteField = (index: number): FieldSetProps[] => {
        const dayService = commerce?.serviceHours.onsite[index] as DayService;

        setValue(`serviceHours.onsite.${index}.dayId`, dayService?.dayId);
        setValue(`serviceHours.onsite.${index}.key`, dayService?.key);

        return [
            {
                className: styles.Checkbox,
                field: {
                    className:
                        errors.serviceHours?.onsite &&
                        errors.serviceHours.onsite[index] &&
                        errors.serviceHours.onsite[index]?.enabled
                            ? FieldStyles.OutlineDanger
                            : FieldStyles.OutlinePrimary,
                    strategy: 'checkbox',
                    defaultChecked: dayService?.enabled,
                    ...register(`serviceHours.onsite.${index}.enabled`),
                },
                isHintReserved: true,
                hint: {
                    hasDots: true,
                    title: translate(
                        errors.serviceHours?.onsite &&
                            errors.serviceHours.onsite[index] &&
                            errors.serviceHours.onsite[index]?.enabled
                            ? (errors.serviceHours.onsite[index]?.enabled?.message as AdminLang)
                            : `day.${dayService?.key.toLowerCase() as WeekDay}`
                    ),
                    children: translate(
                        errors.serviceHours?.onsite &&
                            errors.serviceHours.onsite[index] &&
                            errors.serviceHours.onsite[index]?.enabled
                            ? (errors.serviceHours.onsite[index]?.enabled?.message as AdminLang)
                            : `day.${dayService?.key.toLowerCase() as WeekDay}`
                    ),
                },
            },
            {
                disabled: !watch(`serviceHours.onsite.${index}.enabled`),
                field: {
                    className:
                        errors.serviceHours?.onsite &&
                        errors.serviceHours.onsite[index] &&
                        errors.serviceHours.onsite[index]?.opening
                            ? FieldStyles.OutlineDanger
                            : FieldStyles.OutlinePrimary,
                    placeholder: translate('day.opening'),
                    defaultValue: dayService?.opening,
                    ...register(`serviceHours.onsite.${index}.opening`),
                },
                isHintReserved: true,
                hint: {
                    hasDots: true,
                    title: translate(
                        errors.serviceHours?.onsite &&
                            errors.serviceHours.onsite[index] &&
                            errors.serviceHours.onsite[index]?.opening
                            ? (errors.serviceHours.onsite[index]?.opening?.message as AdminLang)
                            : 'commerceedit.opening.hint'
                    ),
                    children: translate(
                        errors.serviceHours?.onsite &&
                            errors.serviceHours.onsite[index] &&
                            errors.serviceHours.onsite[index]?.opening
                            ? (errors.serviceHours.onsite[index]?.opening?.message as AdminLang)
                            : 'commerceedit.opening.hint'
                    ),
                },
            },
            {
                disabled: !watch(`serviceHours.onsite.${index}.enabled`),
                field: {
                    className:
                        errors.serviceHours?.onsite &&
                        errors.serviceHours.onsite[index] &&
                        errors.serviceHours.onsite[index]?.closing
                            ? FieldStyles.OutlineDanger
                            : FieldStyles.OutlinePrimary,
                    placeholder: translate('day.closing'),
                    defaultValue: dayService?.closing,
                    ...register(`serviceHours.onsite.${index}.closing`),
                },
                isHintReserved: true,
                hint: {
                    hasDots: true,
                    title: translate(
                        errors.serviceHours?.onsite &&
                            errors.serviceHours.onsite[index] &&
                            errors.serviceHours.onsite[index]?.closing
                            ? (errors.serviceHours.onsite[index]?.closing?.message as AdminLang)
                            : 'commerceedit.closing.hint'
                    ),
                    children: translate(
                        errors.serviceHours?.onsite &&
                            errors.serviceHours.onsite[index] &&
                            errors.serviceHours.onsite[index]?.closing
                            ? (errors.serviceHours.onsite[index]?.closing?.message as AdminLang)
                            : 'commerceedit.closing.hint'
                    ),
                },
            },
        ];
    };
    const onsitePreparationTimeField = (): FieldSetProps[] => {
        return [
            {
                field: {
                    className: errors.onsitePreparationTime?.hours
                        ? FieldStyles.OutlineDanger
                        : FieldStyles.OutlinePrimary,
                    strategy: 'decimal',
                    min: 0,
                    step: 1,
                    placeholder: translate('commerceedit.hours.placeholder'),
                    defaultValue: commerce?.onsitePreparationTime.hours,
                    ...register('onsitePreparationTime.hours'),
                },
                isHintReserved: true,
                hint: {
                    hasDots: true,
                    title: translate(
                        errors.onsitePreparationTime?.hours
                            ? (errors.onsitePreparationTime?.hours.message as AdminLang)
                            : 'commerceedit.hours.hint'
                    ),
                    children: translate(
                        errors.onsitePreparationTime?.hours
                            ? (errors.onsitePreparationTime?.hours.message as AdminLang)
                            : 'commerceedit.hours.hint'
                    ),
                },
            },
            {
                field: {
                    className: errors.onsitePreparationTime?.minutes
                        ? FieldStyles.OutlineDanger
                        : FieldStyles.OutlinePrimary,
                    strategy: 'decimal',
                    min: 0,
                    max: 59,
                    step: 1,
                    placeholder: translate('commerceedit.minutes.placeholder'),
                    defaultValue: commerce?.onsitePreparationTime.minutes,
                    ...register('onsitePreparationTime.minutes'),
                },
                isHintReserved: true,
                hint: {
                    hasDots: true,
                    title: translate(
                        errors.onsitePreparationTime?.minutes
                            ? (errors.onsitePreparationTime?.minutes.message as AdminLang)
                            : 'commerceedit.minutes.hint'
                    ),
                    children: translate(
                        errors.onsitePreparationTime?.minutes
                            ? (errors.onsitePreparationTime?.minutes.message as AdminLang)
                            : 'commerceedit.minutes.hint'
                    ),
                },
            },
        ];
    };
    /*  */
    const serviceHoursDeliveryField = (index: number): FieldSetProps[] => {
        const dayService = commerce?.serviceHours.delivery[index] as DayService;

        setValue(`serviceHours.delivery.${index}.dayId`, dayService?.dayId);
        setValue(`serviceHours.delivery.${index}.key`, dayService?.key);

        return [
            {
                className: styles.Checkbox,
                field: {
                    className:
                        errors.serviceHours?.delivery &&
                        errors.serviceHours.delivery[index] &&
                        errors.serviceHours.delivery[index]?.enabled
                            ? FieldStyles.OutlineDanger
                            : FieldStyles.OutlinePrimary,
                    strategy: 'checkbox',
                    defaultChecked: dayService?.enabled,
                    ...register(`serviceHours.delivery.${index}.enabled`),
                },
                isHintReserved: true,
                hint: {
                    hasDots: true,
                    title: translate(
                        errors.serviceHours?.delivery &&
                            errors.serviceHours.delivery[index] &&
                            errors.serviceHours.delivery[index]?.enabled
                            ? (errors.serviceHours.delivery[index]?.enabled?.message as AdminLang)
                            : `day.${dayService?.key.toLowerCase() as WeekDay}`
                    ),
                    children: translate(
                        errors.serviceHours?.delivery &&
                            errors.serviceHours.delivery[index] &&
                            errors.serviceHours.delivery[index]?.enabled
                            ? (errors.serviceHours.delivery[index]?.enabled?.message as AdminLang)
                            : `day.${dayService?.key.toLowerCase() as WeekDay}`
                    ),
                },
            },
            {
                disabled: !watch(`serviceHours.delivery.${index}.enabled`),
                field: {
                    className:
                        errors.serviceHours?.delivery &&
                        errors.serviceHours.delivery[index] &&
                        errors.serviceHours.delivery[index]?.opening
                            ? FieldStyles.OutlineDanger
                            : FieldStyles.OutlinePrimary,
                    placeholder: translate('day.opening'),
                    defaultValue: dayService?.opening,
                    ...register(`serviceHours.delivery.${index}.opening`),
                },
                isHintReserved: true,
                hint: {
                    hasDots: true,
                    title: translate(
                        errors.serviceHours?.delivery &&
                            errors.serviceHours.delivery[index] &&
                            errors.serviceHours.delivery[index]?.opening
                            ? (errors.serviceHours.delivery[index]?.opening?.message as AdminLang)
                            : 'commerceedit.opening.hint'
                    ),
                    children: translate(
                        errors.serviceHours?.delivery &&
                            errors.serviceHours.delivery[index] &&
                            errors.serviceHours.delivery[index]?.opening
                            ? (errors.serviceHours.delivery[index]?.opening?.message as AdminLang)
                            : 'commerceedit.opening.hint'
                    ),
                },
            },
            {
                disabled: !watch(`serviceHours.delivery.${index}.enabled`),
                field: {
                    className:
                        errors.serviceHours?.delivery &&
                        errors.serviceHours.delivery[index] &&
                        errors.serviceHours.delivery[index]?.closing
                            ? FieldStyles.OutlineDanger
                            : FieldStyles.OutlinePrimary,
                    placeholder: translate('day.closing'),
                    defaultValue: dayService?.closing,
                    ...register(`serviceHours.delivery.${index}.closing`),
                },
                isHintReserved: true,
                hint: {
                    hasDots: true,
                    title: translate(
                        errors.serviceHours?.delivery &&
                            errors.serviceHours.delivery[index] &&
                            errors.serviceHours.delivery[index]?.closing
                            ? (errors.serviceHours.delivery[index]?.closing?.message as AdminLang)
                            : 'commerceedit.closing.hint'
                    ),
                    children: translate(
                        errors.serviceHours?.delivery &&
                            errors.serviceHours.delivery[index] &&
                            errors.serviceHours.delivery[index]?.closing
                            ? (errors.serviceHours.delivery[index]?.closing?.message as AdminLang)
                            : 'commerceedit.closing.hint'
                    ),
                },
            },
        ];
    };
    const deliveryPreparationTimeField = (): FieldSetProps[] => {
        return [
            {
                field: {
                    className: errors.deliveryPreparationTime?.hours
                        ? FieldStyles.OutlineDanger
                        : FieldStyles.OutlinePrimary,
                    strategy: 'decimal',
                    min: 0,
                    step: 1,
                    placeholder: translate('commerceedit.hours.placeholder'),
                    defaultValue: commerce?.deliveryPreparationTime.hours,
                    ...register('deliveryPreparationTime.hours'),
                },
                isHintReserved: true,
                hint: {
                    hasDots: true,
                    title: translate(
                        errors.deliveryPreparationTime?.hours
                            ? (errors.deliveryPreparationTime?.hours.message as AdminLang)
                            : 'commerceedit.hours.hint'
                    ),
                    children: translate(
                        errors.deliveryPreparationTime?.hours
                            ? (errors.deliveryPreparationTime?.hours.message as AdminLang)
                            : 'commerceedit.hours.hint'
                    ),
                },
            },
            {
                field: {
                    className: errors.deliveryPreparationTime?.minutes
                        ? FieldStyles.OutlineDanger
                        : FieldStyles.OutlinePrimary,
                    strategy: 'decimal',
                    min: 0,
                    max: 59,
                    step: 1,
                    placeholder: translate('commerceedit.minutes.placeholder'),
                    defaultValue: commerce?.deliveryPreparationTime.minutes,
                    ...register('deliveryPreparationTime.minutes'),
                },
                isHintReserved: true,
                hint: {
                    hasDots: true,
                    title: translate(
                        errors.deliveryPreparationTime?.minutes
                            ? (errors.deliveryPreparationTime?.minutes.message as AdminLang)
                            : 'commerceedit.minutes.hint'
                    ),
                    children: translate(
                        errors.deliveryPreparationTime?.minutes
                            ? (errors.deliveryPreparationTime?.minutes.message as AdminLang)
                            : 'commerceedit.minutes.hint'
                    ),
                },
            },
        ];
    };

    const updateAttentionServiceHoursOnsiteFormFields: FieldSetProps[] = [
        ...[...Array(commerce?.serviceHours.onsite.length)]
            .map((_, index) => serviceHoursOnsiteField(index))
            .reduce((prev, current) => [...prev, ...current]),
    ];

    const updateAttentionOnsitePreparationTimeFormFields: FieldSetProps[] = [...onsitePreparationTimeField()];

    const updateAttentionServiceHoursDeliveryFormFields: FieldSetProps[] = [
        ...[...Array(commerce?.serviceHours.delivery.length)]
            .map((_, index) => serviceHoursDeliveryField(index))
            .reduce((prev, current) => [...prev, ...current]),
    ];

    const updateAttentionDeliveryPreparationTimeFormFields: FieldSetProps[] = [...deliveryPreparationTimeField()];

    return {
        handleUpdateAttention,
        handleResetUpdateAttentionForm,
        handleRepeatSunday,
        updateAttentionServiceHoursOnsiteFormFields,
        updateAttentionOnsitePreparationTimeFormFields,
        updateAttentionServiceHoursDeliveryFormFields,
        updateAttentionDeliveryPreparationTimeFormFields,
    };
};
