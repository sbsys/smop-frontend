/* react */
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
/* context */
import { useCommerceDetailContext } from '../CommerceDetail.context';
/* components */
import { Button, ButtonProps, Legend } from 'shared/components';
/* hooks */
import { useLoader } from 'shared/hooks';
import { AdminLang, FieldSetProps, useAdminLang, useAdminNotify, WeekDay } from 'admin/core';
/* services */
import { updateAttentionService } from 'admin/commerces/services';
/* utils */
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
/* types */
import { DayServiceValue, ExtendedDayService, ExtendedServiceHours, PreparationTime } from 'admin/commerces/types';
/* assets */
import { MdAdd, MdCheckCircle, MdError, MdRemove } from 'react-icons/md';
/* styles */
import { ButtonStyles, FieldStyles } from 'shared/styles';
import styles from './UpdateAttention.module.scss';

export interface UpdateAttentionForm {
    serviceHours: ExtendedServiceHours;
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
                            schedules: yup.array().of(
                                yup.object({
                                    opening: yup
                                        .string()
                                        .matches(/^(\d{2}):([0-5])([0-9])$/, 'commerceedit.opening.format'),
                                    closing: yup
                                        .string()
                                        .matches(/^(\d{2}):([0-5])([0-9])$/, 'commerceedit.closing.format'),
                                })
                            ),
                        })
                        .required()
                ),
                delivery: yup.array(
                    yup
                        .object({
                            schedules: yup.array().of(
                                yup.object({
                                    opening: yup
                                        .string()
                                        .matches(/^(\d{2}):([0-5])([0-9])$/, 'commerceedit.opening.format'),
                                    closing: yup
                                        .string()
                                        .matches(/^(\d{2}):([0-5])([0-9])$/, 'commerceedit.closing.format'),
                                })
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
        unregister,
        formState: { errors },
        setValue,
        watch,
        trigger,
    } = useForm<UpdateAttentionForm>({
        mode: 'all',
        resolver: yupResolver(UpdateAttentionSchema),
        shouldUnregister: false,
    });

    const [scheduleCountByDay, setScheduleCountByDay] = useState<{
        onsite: { [index: string]: number };
        delivery: { [index: string]: number };
    }>({
        onsite: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1 },
        delivery: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1 },
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

    const handleRepeatSunday = useCallback(
        async (attention: 'onsite' | 'delivery') => {
            if (
                !(await trigger(
                    [
                        `serviceHours.${attention}.0.schedules.0.opening`,
                        `serviceHours.${attention}.0.schedules.0.closing`,
                        `serviceHours.${attention}.0.schedules.1.opening`,
                        `serviceHours.${attention}.0.schedules.1.closing`,
                    ],
                    {
                        shouldFocus: true,
                    }
                ))
            )
                return;

            const enabled = watch(`serviceHours.${attention}.0.enabled`);
            const scheduleCount = watch(`serviceHours.${attention}.0.schedules`)?.length ?? 1;

            [...Array(DayServiceValue.length - 1)].forEach((_, index) => {
                unregister(`serviceHours.${attention}.${index + 1}.enabled`);
                unregister(`serviceHours.${attention}.${index + 1}.schedules`);

                setScheduleCountByDay(prev => {
                    prev[attention][index + 2] = scheduleCount;

                    return { ...prev };
                });

                [...Array(scheduleCount)].forEach((_, scheduleIndex) => {
                    const schedule = watch(`serviceHours.${attention}.0.schedules.${scheduleIndex}`);

                    setValue(
                        `serviceHours.${attention}.${index + 1}.schedules.${scheduleIndex}.opening`,
                        schedule.opening
                    );
                    setValue(
                        `serviceHours.${attention}.${index + 1}.schedules.${scheduleIndex}.closing`,
                        schedule.closing
                    );
                });

                setValue(`serviceHours.${attention}.${index + 1}.enabled`, enabled);
            });
        },
        [setValue, trigger, unregister, watch]
    );

    /* reactivity */
    useEffect(() => {
        if (!isUpdateAttention) return;

        unregister();

        commerce?.serviceHours.onsite.forEach((onsite, index) => {
            setValue(`serviceHours.onsite.${index}.enabled`, onsite.enabled);

            setValue(`serviceHours.onsite.${index}.schedules`, onsite.schedules);

            setScheduleCountByDay(prev => {
                prev.onsite[onsite.dayId] = onsite.schedules.length;

                return { ...prev };
            });
        });

        commerce?.serviceHours.delivery.forEach((delivery, index) => {
            setValue(`serviceHours.delivery.${index}.enabled`, delivery.enabled);

            setValue(`serviceHours.delivery.${index}.schedules`, delivery.schedules);

            setScheduleCountByDay(prev => {
                prev.delivery[delivery.dayId] = delivery.schedules.length;

                return { ...prev };
            });
        });
    }, [commerce?.serviceHours.delivery, commerce?.serviceHours.onsite, isUpdateAttention, setValue, unregister]);

    /* props */
    const addScheduleProps = useCallback(
        (cb: () => void): ButtonProps => ({
            className: ButtonStyles.FillSuccess,
            title: translate('actions.add'),
            type: 'button',
            onClick: cb,
            children: (
                <>
                    <i>
                        <MdAdd />
                    </i>

                    <Legend hasDots>{translate('actions.add')}</Legend>
                </>
            ),
        }),
        [translate]
    );
    const removeScheduleProps = useCallback(
        (cb: () => void): ButtonProps => ({
            className: ButtonStyles.FillDanger,
            title: translate('actions.remove'),
            type: 'button',
            onClick: cb,
            children: (
                <>
                    <i>
                        <MdRemove />
                    </i>

                    <Legend hasDots>{translate('actions.remove')}</Legend>
                </>
            ),
        }),
        [translate]
    );

    const serviceHoursFields = useCallback(
        (index: number, attention: 'onsite' | 'delivery'): FieldSetProps[] => {
            const dayService = commerce?.serviceHours[attention][index] as ExtendedDayService;

            setValue(`serviceHours.${attention}.${index}.dayId`, dayService?.dayId);
            setValue(`serviceHours.${attention}.${index}.key`, dayService?.key);

            return [
                {
                    className: styles.Checkbox,
                    field: {
                        strategy: 'checkbox',
                        id: `serviceHours.${attention}.${index}.enabled`,
                        ...register(`serviceHours.${attention}.${index}.enabled`),
                    },
                    isHintReserved: true,
                    hint: {
                        title: translate(`day.${dayService?.key.toLowerCase() as WeekDay}`),
                        children: (
                            <div className={styles.DayActions}>
                                <label htmlFor={`serviceHours.${attention}.${index}.enabled`}>
                                    <Legend hasDots>
                                        {translate(`day.${dayService?.key.toLowerCase() as WeekDay}`)}
                                    </Legend>
                                </label>

                                <Button
                                    {...(scheduleCountByDay[attention][dayService?.dayId] > 1
                                        ? removeScheduleProps(() =>
                                              setScheduleCountByDay(prev => {
                                                  unregister(`serviceHours.${attention}.${index}.schedules`);

                                                  prev[attention][dayService?.dayId] =
                                                      prev[attention][dayService?.dayId] - 1;
                                                  return { ...prev };
                                              })
                                          )
                                        : addScheduleProps(() =>
                                              setScheduleCountByDay(prev => {
                                                  prev[attention][dayService?.dayId] =
                                                      prev[attention][dayService?.dayId] + 1;
                                                  return { ...prev };
                                              })
                                          ))}
                                    disabled={!watch(`serviceHours.${attention}.${index}.enabled`)}
                                />
                            </div>
                        ),
                    },
                },
                ...[...Array(scheduleCountByDay[attention][dayService?.dayId] ?? 1)]
                    .map((_, scheduleIndex) => {
                        return [
                            {
                                disabled: !watch(`serviceHours.${attention}.${index}.enabled`),
                                field: {
                                    className: errors.serviceHours?.[attention]?.[index]?.schedules?.[scheduleIndex]
                                        ?.opening
                                        ? FieldStyles.OutlineDanger
                                        : FieldStyles.OutlinePrimary,
                                    placeholder: translate('day.opening'),
                                    ...register(
                                        `serviceHours.${attention}.${index}.schedules.${scheduleIndex}.opening`
                                    ),
                                },
                                isHintReserved: true,
                                hint: {
                                    hasDots: true,
                                    title: translate(
                                        (errors.serviceHours?.[attention]?.[index]?.schedules?.[scheduleIndex]?.opening
                                            ?.message as AdminLang) ?? 'commerceedit.opening.hint'
                                    ),
                                    children: translate(
                                        (errors.serviceHours?.[attention]?.[index]?.schedules?.[scheduleIndex]?.opening
                                            ?.message as AdminLang) ?? 'commerceedit.opening.hint'
                                    ),
                                },
                            },
                            {
                                disabled: !watch(`serviceHours.${attention}.${index}.enabled`),
                                field: {
                                    className: errors.serviceHours?.[attention]?.[index]?.schedules?.[scheduleIndex]
                                        ?.closing
                                        ? FieldStyles.OutlineDanger
                                        : FieldStyles.OutlinePrimary,
                                    placeholder: translate('day.closing'),
                                    ...register(
                                        `serviceHours.${attention}.${index}.schedules.${scheduleIndex}.closing`
                                    ),
                                },
                                isHintReserved: true,
                                hint: {
                                    hasDots: true,
                                    title: translate(
                                        (errors.serviceHours?.[attention]?.[index]?.schedules?.[scheduleIndex]?.closing
                                            ?.message as AdminLang) ?? 'commerceedit.closing.hint'
                                    ),
                                    children: translate(
                                        (errors.serviceHours?.[attention]?.[index]?.schedules?.[scheduleIndex]?.closing
                                            ?.message as AdminLang) ?? 'commerceedit.closing.hint'
                                    ),
                                },
                            },
                        ];
                    })
                    .reduce((prev, current) => [...prev, ...current]),
            ];
        },
        [
            addScheduleProps,
            commerce?.serviceHours,
            errors.serviceHours,
            register,
            removeScheduleProps,
            scheduleCountByDay,
            setValue,
            translate,
            unregister,
            watch,
        ]
    );
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
                        (errors.onsitePreparationTime?.hours?.message as AdminLang) ?? 'commerceedit.hours.hint'
                    ),
                    children: translate(
                        (errors.onsitePreparationTime?.hours?.message as AdminLang) ?? 'commerceedit.hours.hint'
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
                        (errors.onsitePreparationTime?.minutes?.message as AdminLang) ?? 'commerceedit.minutes.hint'
                    ),
                    children: translate(
                        (errors.onsitePreparationTime?.minutes?.message as AdminLang) ?? 'commerceedit.minutes.hint'
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
                        (errors.deliveryPreparationTime?.hours?.message as AdminLang) ?? 'commerceedit.hours.hint'
                    ),
                    children: translate(
                        (errors.deliveryPreparationTime?.hours?.message as AdminLang) ?? 'commerceedit.hours.hint'
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
                        (errors.deliveryPreparationTime?.minutes?.message as AdminLang) ?? 'commerceedit.minutes.hint'
                    ),
                    children: translate(
                        (errors.deliveryPreparationTime?.minutes?.message as AdminLang) ?? 'commerceedit.minutes.hint'
                    ),
                },
            },
        ];
    };

    const updateAttentionServiceHoursOnsiteFormFields: FieldSetProps[] = [
        ...[...Array(commerce?.serviceHours.onsite.length)]
            .map((_, index) => serviceHoursFields(index, 'onsite'))
            .reduce((prev, current) => [...prev, ...current]),
    ];

    const updateAttentionOnsitePreparationTimeFormFields: FieldSetProps[] = [...onsitePreparationTimeField()];

    const updateAttentionServiceHoursDeliveryFormFields: FieldSetProps[] = [
        ...[...Array(commerce?.serviceHours.delivery.length)]
            .map((_, index) => serviceHoursFields(index, 'delivery'))
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
