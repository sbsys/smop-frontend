/* react */
import { useFormContext } from 'react-hook-form';
/* props */
import { AdminLang, FieldSetProps, useAdminLang, WeekDay } from 'admin/core';
import { CreateCommerceForm } from '../CreateCommerce.props';
/* types */
import { DayServiceValue } from 'admin/commerces/types';
/* styles */
import { FieldStyles } from 'shared/styles';
import styles from './CreateCommerceAttention.module.scss';

export const useCreateCommerceAttention = () => {
    /* states */
    const {
        register,
        setValue,
        formState: { errors },
        watch,
        trigger,
    } = useFormContext<CreateCommerceForm>();

    const { translate } = useAdminLang();

    /* functions */
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

    /* props */
    const serviceHoursOnsiteField = (index: number): FieldSetProps[] => {
        const dayService = DayServiceValue[index];

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
                            : 'createcommerce.opening.hint'
                    ),
                    children: translate(
                        errors.serviceHours?.onsite &&
                            errors.serviceHours.onsite[index] &&
                            errors.serviceHours.onsite[index]?.opening
                            ? (errors.serviceHours.onsite[index]?.opening?.message as AdminLang)
                            : 'createcommerce.opening.hint'
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
                            : 'createcommerce.closing.hint'
                    ),
                    children: translate(
                        errors.serviceHours?.onsite &&
                            errors.serviceHours.onsite[index] &&
                            errors.serviceHours.onsite[index]?.closing
                            ? (errors.serviceHours.onsite[index]?.closing?.message as AdminLang)
                            : 'createcommerce.closing.hint'
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
    const serviceHoursDeliveryField = (index: number): FieldSetProps[] => {
        const dayService = DayServiceValue[index];

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
                            : 'createcommerce.opening.hint'
                    ),
                    children: translate(
                        errors.serviceHours?.delivery &&
                            errors.serviceHours.delivery[index] &&
                            errors.serviceHours.delivery[index]?.opening
                            ? (errors.serviceHours.delivery[index]?.opening?.message as AdminLang)
                            : 'createcommerce.opening.hint'
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
                            : 'createcommerce.closing.hint'
                    ),
                    children: translate(
                        errors.serviceHours?.delivery &&
                            errors.serviceHours.delivery[index] &&
                            errors.serviceHours.delivery[index]?.closing
                            ? (errors.serviceHours.delivery[index]?.closing?.message as AdminLang)
                            : 'createcommerce.closing.hint'
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
            .map((_, index) => serviceHoursOnsiteField(index))
            .reduce((prev, current) => [...prev, ...current]),
    ];

    const createCommerceAttentionOnsitePreparationTimeFormFields: FieldSetProps[] = [...onsitePreparationTimeField()];

    const createCommerceAttentionServiceHoursDeliveryFormFields: FieldSetProps[] = [
        ...[...Array(DayServiceValue.length)]
            .map((_, index) => serviceHoursDeliveryField(index))
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
