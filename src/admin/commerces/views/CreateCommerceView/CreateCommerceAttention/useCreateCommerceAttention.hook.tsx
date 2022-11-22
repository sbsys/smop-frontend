/* react */
import { useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';
/* props */
import { AdminLang, FieldSetProps, useAdminLang, WeekDay } from 'admin/core';
import { CreateCommerceForm } from '../CreateCommerce.props';
/* components */
import { Button, ButtonProps, Legend } from 'shared/components';
/* types */
import { DayServiceValue } from 'admin/commerces/types';
/* assets */
import { MdAdd, MdRemove } from 'react-icons/md';
/* styles */
import { ButtonStyles, FieldStyles } from 'shared/styles';
import styles from './CreateCommerceAttention.module.scss';

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
    }>({
        onsite: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1 },
        delivery: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1 },
    });

    const { translate } = useAdminLang();

    /* functions */
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

    const serviceHoursFields = (index: number, attention: 'onsite' | 'delivery'): FieldSetProps[] => {
        const dayService = DayServiceValue[index];

        setValue(`serviceHours.${attention}.${index}.dayId`, dayService?.dayId);
        setValue(`serviceHours.${attention}.${index}.key`, dayService?.key);

        return [
            {
                className: styles.Checkbox,
                field: {
                    strategy: 'checkbox',
                    defaultChecked: dayService?.enabled,
                    ...register(`serviceHours.${attention}.${index}.enabled`),
                },
                isHintReserved: true,
                hint: {
                    hasDots: true,
                    title: translate(`day.${dayService?.key.toLowerCase() as WeekDay}`),
                    children: (
                        <div className={styles.DayActions}>
                            <label htmlFor={`serviceHours.${attention}.${index}.enabled`}>
                                <Legend hasDots>{translate(`day.${dayService?.key.toLowerCase() as WeekDay}`)}</Legend>
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
                                defaultValue: '00:00',
                                ...register(`serviceHours.${attention}.${index}.schedules.${scheduleIndex}.opening`),
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
                            disabled: !watch(`serviceHours.${attention}.${index}.enabled`),
                            field: {
                                className: errors.serviceHours?.[attention]?.[index]?.schedules?.[scheduleIndex]
                                    ?.closing
                                    ? FieldStyles.OutlineDanger
                                    : FieldStyles.OutlinePrimary,
                                placeholder: translate('day.closing'),
                                defaultValue: '00:00',
                                ...register(`serviceHours.${attention}.${index}.schedules.${scheduleIndex}.closing`),
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
                    defaultValue: 0,
                    placeholder: translate('createcommerce.hours.placeholder'),
                    ...register('onsitePreparationTime.hours'),
                },
                isHintReserved: true,
                hint: {
                    hasDots: true,
                    title: translate(
                        errors.onsitePreparationTime?.hours
                            ? (errors.onsitePreparationTime?.hours.message as AdminLang)
                            : 'createcommerce.hours.hint'
                    ),
                    children: translate(
                        errors.onsitePreparationTime?.hours
                            ? (errors.onsitePreparationTime?.hours.message as AdminLang)
                            : 'createcommerce.hours.hint'
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
                    defaultValue: 0,
                    placeholder: translate('createcommerce.minutes.placeholder'),
                    ...register('onsitePreparationTime.minutes'),
                },
                isHintReserved: true,
                hint: {
                    hasDots: true,
                    title: translate(
                        errors.onsitePreparationTime?.minutes
                            ? (errors.onsitePreparationTime?.minutes.message as AdminLang)
                            : 'createcommerce.minutes.hint'
                    ),
                    children: translate(
                        errors.onsitePreparationTime?.minutes
                            ? (errors.onsitePreparationTime?.minutes.message as AdminLang)
                            : 'createcommerce.minutes.hint'
                    ),
                },
            },
        ];
    };
    /*  */
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
                    defaultValue: 0,
                    placeholder: translate('createcommerce.hours.placeholder'),
                    ...register('deliveryPreparationTime.hours'),
                },
                isHintReserved: true,
                hint: {
                    hasDots: true,
                    title: translate(
                        errors.deliveryPreparationTime?.hours
                            ? (errors.deliveryPreparationTime?.hours.message as AdminLang)
                            : 'createcommerce.hours.hint'
                    ),
                    children: translate(
                        errors.deliveryPreparationTime?.hours
                            ? (errors.deliveryPreparationTime?.hours.message as AdminLang)
                            : 'createcommerce.hours.hint'
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
                    defaultValue: 0,
                    placeholder: translate('createcommerce.minutes.placeholder'),
                    ...register('deliveryPreparationTime.minutes'),
                },
                isHintReserved: true,
                hint: {
                    hasDots: true,
                    title: translate(
                        errors.deliveryPreparationTime?.minutes
                            ? (errors.deliveryPreparationTime?.minutes.message as AdminLang)
                            : 'createcommerce.minutes.hint'
                    ),
                    children: translate(
                        errors.deliveryPreparationTime?.minutes
                            ? (errors.deliveryPreparationTime?.minutes.message as AdminLang)
                            : 'createcommerce.minutes.hint'
                    ),
                },
            },
        ];
    };

    const createCommerceAttentionServiceHoursOnsiteFormFields: FieldSetProps[] = [
        ...[...Array(DayServiceValue.length)]
            .map((_, index) => serviceHoursFields(index, 'onsite'))
            .reduce((prev, current) => [...prev, ...current]),
    ];

    const createCommerceAttentionOnsitePreparationTimeFormFields: FieldSetProps[] = [...onsitePreparationTimeField()];

    const createCommerceAttentionServiceHoursDeliveryFormFields: FieldSetProps[] = [
        ...[...Array(DayServiceValue.length)]
            .map((_, index) => serviceHoursFields(index, 'delivery'))
            .reduce((prev, current) => [...prev, ...current]),
    ];

    const createCommerceAttentionDeliveryPreparationTimeFormFields: FieldSetProps[] = [
        ...deliveryPreparationTimeField(),
    ];

    return {
        createCommerceAttentionServiceHoursOnsiteFormFields,
        createCommerceAttentionOnsitePreparationTimeFormFields,
        createCommerceAttentionServiceHoursDeliveryFormFields,
        createCommerceAttentionDeliveryPreparationTimeFormFields,
        handleRepeatSunday,
    };
};
