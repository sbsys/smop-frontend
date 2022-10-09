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
/* assets */
import { MdCheckCircle, MdError } from 'react-icons/md';
/* styles */
import { FieldStyles } from 'shared/styles';
import styles from './UpdateAttention.module.scss';

interface UpdateAttentionForm {
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
        setFocus,
    } = useForm<UpdateAttentionForm>();

    const { t } = useTranslation();

    const { notify } = useAdminNotify();

    const { showLoader, hideLoader } = useLoader();

    /* functions */
    const handleUpdateAttention = handleSubmit(async data => {
        showLoader();
        console.log(data);

        const service = await { error: true, message: 'Update attention', data: {} };

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
                        `views.commercedetail.updateattention.form.servicehours.onside.${dayService?.key.toLowerCase()}.opening.placeholder`
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
                            : `views.commercedetail.updateattention.form.servicehours.onside.${dayService?.key.toLowerCase()}.opening.hint`
                    ),
                    children: t(
                        errors.serviceHours?.onsite &&
                            errors.serviceHours.onsite[index] &&
                            errors.serviceHours.onsite[index]?.opening
                            ? (errors.serviceHours.onsite[index]?.opening?.message as string)
                            : `views.commercedetail.updateattention.form.servicehours.onside.${dayService?.key.toLowerCase()}.opening.hint`
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
                        `views.commercedetail.updateattention.form.servicehours.onside.${dayService?.key.toLowerCase()}.closing.placeholder`
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
                            : `views.commercedetail.updateattention.form.servicehours.onside.${dayService?.key.toLowerCase()}.closing.hint`
                    ),
                    children: t(
                        errors.serviceHours?.onsite &&
                            errors.serviceHours.onsite[index] &&
                            errors.serviceHours.onsite[index]?.closing
                            ? (errors.serviceHours.onsite[index]?.closing?.message as string)
                            : `views.commercedetail.updateattention.form.servicehours.onside.${dayService?.key.toLowerCase()}.closing.hint`
                    ),
                },
            },
        ];
    };
    const onsitePreparationTimeField = (index: number): FieldSetProps[] => {
        return [];
    };

    const updateAttentionFormFields: FieldSetProps[] = [
        ...[...Array(commerce?.serviceHours.onsite.length)]
            .map((_, index) => serviceHoursOnsiteField(index))
            .reduce((prev, current) => [...prev, ...current]),
    ];

    return { handleUpdateAttention, handleResetUpdateAttentionForm, updateAttentionFormFields };
};
