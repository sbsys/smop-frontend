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
import {
    Attention,
    DayServiceValue,
    ExtendedDayService,
    ExtendedServiceHours,
    PreparationTime,
} from 'admin/commerces/types';
/* assets */
import { MdAdd, MdCheckCircle, MdError, MdRemove } from 'react-icons/md';
/* styles */
import { ButtonStyles, FieldStyles } from 'shared/styles';
import styles from './UpdateAttention.module.scss';
import { isAfter, isBefore } from 'date-fns';
import { classNames } from 'shared/utils';

export interface UpdateAttentionForm {
    serviceHours: ExtendedServiceHours;
    onsitePreparationTime: PreparationTime;
    deliveryPreparationTime: PreparationTime;
}

const serviceHours = yup.array(
    yup
        .object({
            schedules: yup.array().of(
                yup.object({
                    opening: yup
                        .string()
                        .matches(/^(\d{2}):([0-5])([0-9])$/, 'commerceedit.opening.format')
                        .test('overlap', 'commerceedit.opening.overlap', (value, schema) => {
                            return isBefore(new Date(`2020T${value}`), new Date(`2020T${schema.parent.closing}`));
                        }),
                    closing: yup
                        .string()
                        .matches(/^(\d{2}):([0-5])([0-9])$/, 'commerceedit.closing.format')
                        .test('overlap', 'commerceedit.closing.overlap', (value, schema) => {
                            return isAfter(new Date(`2020T${value}`), new Date(`2020T${schema.parent.opening}`));
                        }),
                })
            ),
        })
        .required()
);

export const UpdateAttentionSchema = yup
    .object({
        serviceHours: yup
            .object({
                onsite: serviceHours,
                delivery: serviceHours,
                curbside: serviceHours,
                pickup: serviceHours,
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
        curbside: { [index: string]: number };
        pickup: { [index: string]: number };
    }>({
        onsite: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1 },
        delivery: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1 },
        curbside: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1 },
        pickup: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1 },
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
        async (attention: Attention) => {
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
        if (!isUpdateAttention || !commerce?.serviceHours) return;

        unregister();

        Object.keys(commerce.serviceHours).forEach(key => {
            const currentServiceHours = commerce.serviceHours[key as Attention];

            currentServiceHours?.forEach((service, index) => {
                setValue(`serviceHours.${key as Attention}.${index}.enabled`, service.enabled);

                setValue(`serviceHours.${key as Attention}.${index}.schedules`, service.schedules);

                setScheduleCountByDay(prev => {
                    prev[key as Attention][service.dayId] = service.schedules.length;

                    return { ...prev };
                });
            });
        });
    }, [commerce?.serviceHours, isUpdateAttention, setValue, unregister]);

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
        (index: number, attention: Attention): FieldSetProps[] => {
            const dayService = commerce?.serviceHours[attention]?.[index] as ExtendedDayService;

            setValue(`serviceHours.${attention}.${index}.dayId`, dayService?.dayId);
            setValue(`serviceHours.${attention}.${index}.key`, dayService?.key);

            const handleRemoveTime = () => {
                unregister(`serviceHours.${attention}.${index}.schedules`);

                setScheduleCountByDay(prev => {
                    const newScheduleCount = prev[attention][dayService?.dayId] - 1;

                    prev[attention][dayService?.dayId] = newScheduleCount;
                    return { ...prev };
                });
            };

            const handleAddTime = () =>
                setScheduleCountByDay(prev => {
                    const newScheduleCount = prev[attention][dayService?.dayId] + 1;

                    prev[attention][dayService?.dayId] = newScheduleCount;
                    return { ...prev };
                });

            return [
                {
                    key: `serviceHours.${attention}.${index}.enabled`,
                    className: classNames(styles.Checkbox, styles.LastServiceHours),
                    style: {
                        gridRow: `span ${scheduleCountByDay[attention][dayService?.dayId] ?? 1}`,
                    },
                    field: {
                        strategy: 'checkbox',
                        id: `serviceHours.${attention}.${index}.enabled`,
                        disabled: !!errors.serviceHours?.[attention]?.[index]?.schedules,
                        ...register(`serviceHours.${attention}.${index}.enabled`),
                    },
                    isHintReserved: true,
                    hint: {
                        title: translate(`day.${dayService?.key?.toLowerCase() as WeekDay}`),
                        children: (
                            <div className={styles.DayActions}>
                                <label htmlFor={`serviceHours.${attention}.${index}.enabled`}>
                                    <Legend hasDots>
                                        {translate(`day.${dayService?.key?.toLowerCase() as WeekDay}`)}
                                    </Legend>
                                </label>

                                <Button
                                    {...(scheduleCountByDay[attention][dayService?.dayId] > 1
                                        ? removeScheduleProps(handleRemoveTime)
                                        : addScheduleProps(handleAddTime))}
                                    disabled={!watch(`serviceHours.${attention}.${index}.enabled`)}
                                />
                            </div>
                        ),
                    },
                },
                ...[...Array(scheduleCountByDay[attention][dayService?.dayId] ?? 1)]
                    .map((_, scheduleIndex) => {
                        const isLastServiceHours =
                            (scheduleCountByDay[attention][dayService?.dayId] ?? 1) - 1 === scheduleIndex;

                        const isNotFirstOpening: boolean = scheduleIndex > 0;

                        return [
                            {
                                key: `serviceHours.${attention}.${index}.schedules.${scheduleIndex}.opening`,
                                disabled: !watch(`serviceHours.${attention}.${index}.enabled`),
                                className: classNames(
                                    isLastServiceHours && styles.LastServiceHours,
                                    isNotFirstOpening && styles.NotFirstOpening
                                ),
                                field: {
                                    className: errors.serviceHours?.[attention]?.[index]?.schedules?.[scheduleIndex]
                                        ?.opening
                                        ? FieldStyles.OutlineDanger
                                        : FieldStyles.OutlinePrimary,
                                    placeholder: translate('day.opening'),
                                    defaultValue: '08:00',
                                    ...register(
                                        `serviceHours.${attention}.${index}.schedules.${scheduleIndex}.opening`,
                                        {
                                            onChange: () =>
                                                trigger(
                                                    `serviceHours.${attention}.${index}.schedules.${scheduleIndex}.closing`
                                                ),
                                        }
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
                                key: `serviceHours.${attention}.${index}.schedules.${scheduleIndex}.closing`,
                                disabled: !watch(`serviceHours.${attention}.${index}.enabled`),
                                className: classNames(isLastServiceHours && styles.LastServiceHours),
                                field: {
                                    className: errors.serviceHours?.[attention]?.[index]?.schedules?.[scheduleIndex]
                                        ?.closing
                                        ? FieldStyles.OutlineDanger
                                        : FieldStyles.OutlinePrimary,
                                    placeholder: translate('day.closing'),
                                    defaultValue: '17:00',
                                    ...register(
                                        `serviceHours.${attention}.${index}.schedules.${scheduleIndex}.closing`,
                                        {
                                            onChange: () =>
                                                trigger(
                                                    `serviceHours.${attention}.${index}.schedules.${scheduleIndex}.opening`
                                                ),
                                        }
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
            trigger,
            unregister,
            watch,
        ]
    );
    const preparationTimeField = (attention: /* Attention */ 'delivery' | 'onsite'): FieldSetProps[] => {
        return [
            {
                className: classNames(styles.Title, styles.LastServiceHours),
                field: {
                    disabled: true,
                },
                isHintReserved: true,
                hint: {
                    hasDots: true,
                    title: translate(`commerceedit.${attention}preparation` as AdminLang),
                    children: translate(`commerceedit.${attention}preparation` as AdminLang),
                },
            },
            {
                className: styles.LastServiceHours,
                field: {
                    className: errors[`${attention}PreparationTime`]?.hours
                        ? FieldStyles.OutlineDanger
                        : FieldStyles.OutlinePrimary,
                    strategy: 'decimal',
                    min: 0,
                    step: 1,
                    defaultValue: commerce?.[`${attention}PreparationTime`]?.hours ?? 0,
                    placeholder: translate('commerceedit.hours.placeholder'),
                    ...register(`${attention}PreparationTime.hours`),
                },
                isHintReserved: true,
                hint: {
                    hasDots: true,
                    title: translate(
                        (errors[`${attention}PreparationTime`]?.hours?.message as AdminLang) ??
                            'commerceedit.hours.hint'
                    ),
                    children: translate(
                        (errors[`${attention}PreparationTime`]?.hours?.message as AdminLang) ??
                            'commerceedit.hours.hint'
                    ),
                },
            },
            {
                className: styles.LastServiceHours,
                field: {
                    className: errors[`${attention}PreparationTime`]?.minutes
                        ? FieldStyles.OutlineDanger
                        : FieldStyles.OutlinePrimary,
                    strategy: 'decimal',
                    min: 0,
                    max: 59,
                    step: 1,
                    defaultValue: commerce?.[`${attention}PreparationTime`]?.minutes ?? 0,
                    placeholder: translate('commerceedit.minutes.placeholder'),
                    ...register(`${attention}PreparationTime.minutes`),
                },
                isHintReserved: true,
                hint: {
                    hasDots: true,
                    title: translate(
                        (errors[`${attention}PreparationTime`]?.minutes?.message as AdminLang) ??
                            'commerceedit.minutes.hint'
                    ),
                    children: translate(
                        (errors[`${attention}PreparationTime`]?.minutes?.message as AdminLang) ??
                            'commerceedit.minutes.hint'
                    ),
                },
            },
        ];
    };

    const updateAttentionServiceHoursStrategy: Record<Attention, FieldSetProps[]> = {
        onsite: [...Array(DayServiceValue.length)]
            .map((_, index) => serviceHoursFields(index, 'onsite'))
            .reduce((prev, current) => [...prev, ...current]),
        delivery: [...Array(DayServiceValue.length)]
            .map((_, index) => serviceHoursFields(index, 'delivery'))
            .reduce((prev, current) => [...prev, ...current]),
        curbside: [...Array(DayServiceValue.length)]
            .map((_, index) => serviceHoursFields(index, 'curbside'))
            .reduce((prev, current) => [...prev, ...current]),
        pickup: [...Array(DayServiceValue.length)]
            .map((_, index) => serviceHoursFields(index, 'pickup'))
            .reduce((prev, current) => [...prev, ...current]),
    };

    const updateAttentionPreparationTimeStrategy: Record<Attention, FieldSetProps[]> = {
        onsite: preparationTimeField('onsite'),
        delivery: preparationTimeField('delivery'),
        curbside: [],
        pickup: [],
    };

    const updateAttentionServiceHoursOnsiteFormFields: FieldSetProps[] = [
        ...[...Array(commerce?.serviceHours.onsite.length)]
            .map((_, index) => serviceHoursFields(index, 'onsite'))
            .reduce((prev, current) => [...prev, ...current], [] as FieldSetProps[]),
    ];

    const updateAttentionOnsitePreparationTimeFormFields: FieldSetProps[] = [...preparationTimeField('onsite')];

    const updateAttentionServiceHoursDeliveryFormFields: FieldSetProps[] = [
        ...[...Array(commerce?.serviceHours.delivery.length)]
            .map((_, index) => serviceHoursFields(index, 'delivery'))
            .reduce((prev, current) => [...prev, ...current], [] as FieldSetProps[]),
    ];

    const updateAttentionDeliveryPreparationTimeFormFields: FieldSetProps[] = [...preparationTimeField('delivery')];

    return {
        handleUpdateAttention,
        handleResetUpdateAttentionForm,
        handleRepeatSunday,
        updateAttentionServiceHoursStrategy,
        updateAttentionPreparationTimeStrategy,
        updateAttentionServiceHoursOnsiteFormFields,
        updateAttentionOnsitePreparationTimeFormFields,
        updateAttentionServiceHoursDeliveryFormFields,
        updateAttentionDeliveryPreparationTimeFormFields,
    };
};
