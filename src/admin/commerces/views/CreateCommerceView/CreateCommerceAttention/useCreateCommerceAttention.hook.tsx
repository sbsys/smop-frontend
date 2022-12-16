/* react */
import { useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';
/* props */
import { AdminLang, FieldSetProps, useAdminLang, WeekDay } from 'admin/core';
import { CreateCommerceForm } from '../CreateCommerce.props';
/* components */
import { Button, ButtonProps, Legend } from 'shared/components';
/* types */
import { Attention, DayServiceValue } from 'admin/commerces/types';
/* assets */
import { MdAdd, MdRemove } from 'react-icons/md';
/* styles */
import { ButtonStyles, FieldStyles } from 'shared/styles';
import styles from './CreateCommerceAttention.module.scss';
import { classNames } from 'shared/utils';

export const useCreateCommerceAttention = () => {
    /* states */
    const {
        register,
        unregister,
        setValue,
        formState: { errors },
        watch,
        trigger,
    } = useFormContext<CreateCommerceForm>();

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

    /* functions */
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
            const dayService = DayServiceValue[index];

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
                        defaultChecked: dayService?.enabled,
                        disabled: !!errors.serviceHours?.[attention]?.[index]?.schedules,
                        ...register(`serviceHours.${attention}.${index}.enabled`),
                    },
                    isHintReserved: true,
                    hint: {
                        hasDots: true,
                        title: translate(`day.${dayService?.key.toLowerCase() as WeekDay}`),
                        children: (
                            <div className={styles.DayActions}>
                                <label htmlFor={`serviceHours.${attention}.${index}.enabled`}>
                                    {
                                        <Legend hasDots>
                                            {translate(`day.${dayService?.key.toLowerCase() as WeekDay}`)}
                                        </Legend>
                                    }
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

                        const isNotFirstOpening = scheduleIndex > 0;

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
                                            ?.message as AdminLang) ?? 'createcommerce.opening.hint'
                                    ),
                                    children: translate(
                                        (errors.serviceHours?.[attention]?.[index]?.schedules?.[scheduleIndex]?.opening
                                            ?.message as AdminLang) ?? 'createcommerce.opening.hint'
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
                                            ?.message as AdminLang) ?? 'createcommerce.closing.hint'
                                    ),
                                    children: translate(
                                        (errors.serviceHours?.[attention]?.[index]?.schedules?.[scheduleIndex]?.closing
                                            ?.message as AdminLang) ?? 'createcommerce.closing.hint'
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

    /* preparation time */
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
                    title: translate(`createcommerce.${attention}preparation` as AdminLang),
                    children: translate(`createcommerce.${attention}preparation` as AdminLang),
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
                    defaultValue: 0,
                    placeholder: translate('createcommerce.hours.placeholder'),
                    ...register(`${attention}PreparationTime.hours`),
                },
                isHintReserved: true,
                hint: {
                    hasDots: true,
                    title: translate(
                        (errors[`${attention}PreparationTime`]?.hours?.message as AdminLang) ??
                            'createcommerce.hours.hint'
                    ),
                    children: translate(
                        (errors[`${attention}PreparationTime`]?.hours?.message as AdminLang) ??
                            'createcommerce.hours.hint'
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
                    defaultValue: 0,
                    placeholder: translate('createcommerce.minutes.placeholder'),
                    ...register(`${attention}PreparationTime.minutes`),
                },
                isHintReserved: true,
                hint: {
                    hasDots: true,
                    title: translate(
                        (errors[`${attention}PreparationTime`]?.minutes?.message as AdminLang) ??
                            'createcommerce.minutes.hint'
                    ),
                    children: translate(
                        (errors[`${attention}PreparationTime`]?.minutes?.message as AdminLang) ??
                            'createcommerce.minutes.hint'
                    ),
                },
            },
        ];
    };

    const createCommerceServiceHoursStrategy: Record<Attention, FieldSetProps[]> = {
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

    const createCommercePreparationTimeStrategy: Record<Attention, FieldSetProps[]> = {
        onsite: preparationTimeField('onsite'),
        delivery: preparationTimeField('delivery'),
        curbside: [],
        pickup: [],
    };

    return {
        handleRepeatSunday,
        createCommerceServiceHoursStrategy,
        createCommercePreparationTimeStrategy,
    };
};
