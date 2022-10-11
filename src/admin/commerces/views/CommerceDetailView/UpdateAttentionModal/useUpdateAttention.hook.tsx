/* react */
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
/* context */
import { useCommerceDetailContext } from '../CommerceDetail.context';
/* hooks */
import { useLoader } from 'shared/hooks';
import { FieldSetProps, useAdminNotify } from 'admin/core';
/* types */
import { DayService, PreparationTime, ServiceHours } from 'admin/commerces/types';
/* services */
import { updateAttentionService } from 'admin/commerces/services';
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

export const useUpdateAttention = () => {
    /* states */
    const {
        /* states */
        commerce,
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
    } = useForm<UpdateAttentionForm>();

    const { t } = useTranslation();

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
                        `views.commercedetail.updateattention.form.servicehours.onsite.${dayService?.key.toLowerCase()}.opening.placeholder`
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
                            : `views.commercedetail.updateattention.form.servicehours.onsite.${dayService?.key.toLowerCase()}.opening.hint`
                    ),
                    children: t(
                        errors.serviceHours?.onsite &&
                            errors.serviceHours.onsite[index] &&
                            errors.serviceHours.onsite[index]?.opening
                            ? (errors.serviceHours.onsite[index]?.opening?.message as string)
                            : `views.commercedetail.updateattention.form.servicehours.onsite.${dayService?.key.toLowerCase()}.opening.hint`
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
                        `views.commercedetail.updateattention.form.servicehours.onsite.${dayService?.key.toLowerCase()}.closing.placeholder`
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
                            : `views.commercedetail.updateattention.form.servicehours.onsite.${dayService?.key.toLowerCase()}.closing.hint`
                    ),
                    children: t(
                        errors.serviceHours?.onsite &&
                            errors.serviceHours.onsite[index] &&
                            errors.serviceHours.onsite[index]?.closing
                            ? (errors.serviceHours.onsite[index]?.closing?.message as string)
                            : `views.commercedetail.updateattention.form.servicehours.onsite.${dayService?.key.toLowerCase()}.closing.hint`
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
                    placeholder: t('views.commercedetail.updateattention.form.onsitepreparationtime.hours.placeholder'),
                    defaultValue: commerce?.onsitePreparationTime.hours,
                    ...register('onsitePreparationTime.hours'),
                },
                isHintReserved: true,
                hint: {
                    hasDots: true,
                    title: t(
                        errors.onsitePreparationTime?.hours
                            ? (errors.onsitePreparationTime?.hours.message as string)
                            : 'views.commercedetail.updateattention.form.onsitepreparationtime.hours.hint'
                    ),
                    children: t(
                        errors.onsitePreparationTime?.hours
                            ? (errors.onsitePreparationTime?.hours.message as string)
                            : 'views.commercedetail.updateattention.form.onsitepreparationtime.hours.hint'
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
                    placeholder: t(
                        'views.commercedetail.updateattention.form.onsitepreparationtime.minutes.placeholder'
                    ),
                    defaultValue: commerce?.onsitePreparationTime.minutes,
                    ...register('onsitePreparationTime.minutes'),
                },
                isHintReserved: true,
                hint: {
                    hasDots: true,
                    title: t(
                        errors.onsitePreparationTime?.minutes
                            ? (errors.onsitePreparationTime?.minutes.message as string)
                            : 'views.commercedetail.updateattention.form.onsitepreparationtime.minutes.hint'
                    ),
                    children: t(
                        errors.onsitePreparationTime?.minutes
                            ? (errors.onsitePreparationTime?.minutes.message as string)
                            : 'views.commercedetail.updateattention.form.onsitepreparationtime.minutes.hint'
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
                        `views.commercedetail.updateattention.form.servicehours.delivery.${dayService?.key.toLowerCase()}.opening.placeholder`
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
                            : `views.commercedetail.updateattention.form.servicehours.delivery.${dayService?.key.toLowerCase()}.opening.hint`
                    ),
                    children: t(
                        errors.serviceHours?.delivery &&
                            errors.serviceHours.delivery[index] &&
                            errors.serviceHours.delivery[index]?.opening
                            ? (errors.serviceHours.delivery[index]?.opening?.message as string)
                            : `views.commercedetail.updateattention.form.servicehours.delivery.${dayService?.key.toLowerCase()}.opening.hint`
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
                        `views.commercedetail.updateattention.form.servicehours.delivery.${dayService?.key.toLowerCase()}.closing.placeholder`
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
                            : `views.commercedetail.updateattention.form.servicehours.delivery.${dayService?.key.toLowerCase()}.closing.hint`
                    ),
                    children: t(
                        errors.serviceHours?.delivery &&
                            errors.serviceHours.delivery[index] &&
                            errors.serviceHours.delivery[index]?.closing
                            ? (errors.serviceHours.delivery[index]?.closing?.message as string)
                            : `views.commercedetail.updateattention.form.servicehours.delivery.${dayService?.key.toLowerCase()}.closing.hint`
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
                    placeholder: t(
                        'views.commercedetail.updateattention.form.deliverypreparationtime.hours.placeholder'
                    ),
                    defaultValue: commerce?.deliveryPreparationTime.hours,
                    ...register('deliveryPreparationTime.hours'),
                },
                isHintReserved: true,
                hint: {
                    hasDots: true,
                    title: t(
                        errors.deliveryPreparationTime?.hours
                            ? (errors.deliveryPreparationTime?.hours.message as string)
                            : 'views.commercedetail.updateattention.form.deliverypreparationtime.hours.hint'
                    ),
                    children: t(
                        errors.deliveryPreparationTime?.hours
                            ? (errors.deliveryPreparationTime?.hours.message as string)
                            : 'views.commercedetail.updateattention.form.deliverypreparationtime.hours.hint'
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
                    placeholder: t(
                        'views.commercedetail.updateattention.form.deliverypreparationtime.minutes.placeholder'
                    ),
                    defaultValue: commerce?.deliveryPreparationTime.minutes,
                    ...register('deliveryPreparationTime.minutes'),
                },
                isHintReserved: true,
                hint: {
                    hasDots: true,
                    title: t(
                        errors.deliveryPreparationTime?.minutes
                            ? (errors.deliveryPreparationTime?.minutes.message as string)
                            : 'views.commercedetail.updateattention.form.deliverypreparationtime.minutes.hint'
                    ),
                    children: t(
                        errors.deliveryPreparationTime?.minutes
                            ? (errors.deliveryPreparationTime?.minutes.message as string)
                            : 'views.commercedetail.updateattention.form.deliverypreparationtime.minutes.hint'
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
        updateAttentionServiceHoursOnsiteFormFields,
        updateAttentionOnsitePreparationTimeFormFields,
        updateAttentionServiceHoursDeliveryFormFields,
        updateAttentionDeliveryPreparationTimeFormFields,
    };
};
