/* react */
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
/* props */
import { FieldSetProps } from 'admin/core';
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

    const { t } = useTranslation();

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
                    title: t(
                        errors.serviceHours?.onsite &&
                            errors.serviceHours.onsite[index] &&
                            errors.serviceHours.onsite[index]?.enabled
                            ? (errors.serviceHours.onsite[index]?.enabled?.message as string)
                            : `weekday.${dayService?.key.toLowerCase()}`
                    ),
                    children: t(
                        errors.serviceHours?.onsite &&
                            errors.serviceHours.onsite[index] &&
                            errors.serviceHours.onsite[index]?.enabled
                            ? (errors.serviceHours.onsite[index]?.enabled?.message as string)
                            : `weekday.${dayService?.key.toLowerCase()}`
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
                    placeholder: t(
                        `views.createcommerce.attention.form.servicehours.onsite.${dayService?.key.toLowerCase()}.opening.placeholder`
                    ),
                    defaultValue: dayService?.opening,
                    ...register(`serviceHours.onsite.${index}.opening`),
                },
                isHintReserved: true,
                hint: {
                    hasDots: true,
                    title: t(
                        errors.serviceHours?.onsite &&
                            errors.serviceHours.onsite[index] &&
                            errors.serviceHours.onsite[index]?.opening
                            ? (errors.serviceHours.onsite[index]?.opening?.message as string)
                            : `views.createcommerce.attention.form.servicehours.onsite.${dayService?.key.toLowerCase()}.opening.hint`
                    ),
                    children: t(
                        errors.serviceHours?.onsite &&
                            errors.serviceHours.onsite[index] &&
                            errors.serviceHours.onsite[index]?.opening
                            ? (errors.serviceHours.onsite[index]?.opening?.message as string)
                            : `views.createcommerce.attention.form.servicehours.onsite.${dayService?.key.toLowerCase()}.opening.hint`
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
                    placeholder: t(
                        `views.createcommerce.attention.form.servicehours.onsite.${dayService?.key.toLowerCase()}.closing.placeholder`
                    ),
                    defaultValue: dayService?.closing,
                    ...register(`serviceHours.onsite.${index}.closing`),
                },
                isHintReserved: true,
                hint: {
                    hasDots: true,
                    title: t(
                        errors.serviceHours?.onsite &&
                            errors.serviceHours.onsite[index] &&
                            errors.serviceHours.onsite[index]?.closing
                            ? (errors.serviceHours.onsite[index]?.closing?.message as string)
                            : `views.createcommerce.attention.form.servicehours.onsite.${dayService?.key.toLowerCase()}.closing.hint`
                    ),
                    children: t(
                        errors.serviceHours?.onsite &&
                            errors.serviceHours.onsite[index] &&
                            errors.serviceHours.onsite[index]?.closing
                            ? (errors.serviceHours.onsite[index]?.closing?.message as string)
                            : `views.createcommerce.attention.form.servicehours.onsite.${dayService?.key.toLowerCase()}.closing.hint`
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
                    placeholder: t('views.createcommerce.attention.form.onsitepreparationtime.hours.placeholder'),
                    ...register('onsitePreparationTime.hours'),
                },
                isHintReserved: true,
                hint: {
                    hasDots: true,
                    title: t(
                        errors.onsitePreparationTime?.hours
                            ? (errors.onsitePreparationTime?.hours.message as string)
                            : 'views.createcommerce.attention.form.onsitepreparationtime.hours.hint'
                    ),
                    children: t(
                        errors.onsitePreparationTime?.hours
                            ? (errors.onsitePreparationTime?.hours.message as string)
                            : 'views.createcommerce.attention.form.onsitepreparationtime.hours.hint'
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
                    placeholder: t('views.createcommerce.attention.form.onsitepreparationtime.minutes.placeholder'),
                    ...register('onsitePreparationTime.minutes'),
                },
                isHintReserved: true,
                hint: {
                    hasDots: true,
                    title: t(
                        errors.onsitePreparationTime?.minutes
                            ? (errors.onsitePreparationTime?.minutes.message as string)
                            : 'views.createcommerce.attention.form.onsitepreparationtime.minutes.hint'
                    ),
                    children: t(
                        errors.onsitePreparationTime?.minutes
                            ? (errors.onsitePreparationTime?.minutes.message as string)
                            : 'views.createcommerce.attention.form.onsitepreparationtime.minutes.hint'
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
                    title: t(
                        errors.serviceHours?.delivery &&
                            errors.serviceHours.delivery[index] &&
                            errors.serviceHours.delivery[index]?.enabled
                            ? (errors.serviceHours.delivery[index]?.enabled?.message as string)
                            : `weekday.${dayService?.key.toLowerCase()}`
                    ),
                    children: t(
                        errors.serviceHours?.delivery &&
                            errors.serviceHours.delivery[index] &&
                            errors.serviceHours.delivery[index]?.enabled
                            ? (errors.serviceHours.delivery[index]?.enabled?.message as string)
                            : `weekday.${dayService?.key.toLowerCase()}`
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
                    placeholder: t(
                        `views.createcommerce.attention.form.servicehours.delivery.${dayService?.key.toLowerCase()}.opening.placeholder`
                    ),
                    defaultValue: dayService?.opening,
                    ...register(`serviceHours.delivery.${index}.opening`),
                },
                isHintReserved: true,
                hint: {
                    hasDots: true,
                    title: t(
                        errors.serviceHours?.delivery &&
                            errors.serviceHours.delivery[index] &&
                            errors.serviceHours.delivery[index]?.opening
                            ? (errors.serviceHours.delivery[index]?.opening?.message as string)
                            : `views.createcommerce.attention.form.servicehours.delivery.${dayService?.key.toLowerCase()}.opening.hint`
                    ),
                    children: t(
                        errors.serviceHours?.delivery &&
                            errors.serviceHours.delivery[index] &&
                            errors.serviceHours.delivery[index]?.opening
                            ? (errors.serviceHours.delivery[index]?.opening?.message as string)
                            : `views.createcommerce.attention.form.servicehours.delivery.${dayService?.key.toLowerCase()}.opening.hint`
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
                    placeholder: t(
                        `views.createcommerce.attention.form.servicehours.delivery.${dayService?.key.toLowerCase()}.closing.placeholder`
                    ),
                    defaultValue: dayService?.closing,
                    ...register(`serviceHours.delivery.${index}.closing`),
                },
                isHintReserved: true,
                hint: {
                    hasDots: true,
                    title: t(
                        errors.serviceHours?.delivery &&
                            errors.serviceHours.delivery[index] &&
                            errors.serviceHours.delivery[index]?.closing
                            ? (errors.serviceHours.delivery[index]?.closing?.message as string)
                            : `views.createcommerce.attention.form.servicehours.delivery.${dayService?.key.toLowerCase()}.closing.hint`
                    ),
                    children: t(
                        errors.serviceHours?.delivery &&
                            errors.serviceHours.delivery[index] &&
                            errors.serviceHours.delivery[index]?.closing
                            ? (errors.serviceHours.delivery[index]?.closing?.message as string)
                            : `views.createcommerce.attention.form.servicehours.delivery.${dayService?.key.toLowerCase()}.closing.hint`
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
                    placeholder: t('views.createcommerce.attention.form.deliverypreparationtime.hours.placeholder'),
                    ...register('deliveryPreparationTime.hours'),
                },
                isHintReserved: true,
                hint: {
                    hasDots: true,
                    title: t(
                        errors.deliveryPreparationTime?.hours
                            ? (errors.deliveryPreparationTime?.hours.message as string)
                            : 'views.createcommerce.attention.form.deliverypreparationtime.hours.hint'
                    ),
                    children: t(
                        errors.deliveryPreparationTime?.hours
                            ? (errors.deliveryPreparationTime?.hours.message as string)
                            : 'views.createcommerce.attention.form.deliverypreparationtime.hours.hint'
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
                    placeholder: t('views.createcommerce.attention.form.deliverypreparationtime.minutes.placeholder'),
                    ...register('deliveryPreparationTime.minutes'),
                },
                isHintReserved: true,
                hint: {
                    hasDots: true,
                    title: t(
                        errors.deliveryPreparationTime?.minutes
                            ? (errors.deliveryPreparationTime?.minutes.message as string)
                            : 'views.createcommerce.attention.form.deliverypreparationtime.minutes.hint'
                    ),
                    children: t(
                        errors.deliveryPreparationTime?.minutes
                            ? (errors.deliveryPreparationTime?.minutes.message as string)
                            : 'views.createcommerce.attention.form.deliverypreparationtime.minutes.hint'
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
