import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
/* props */
import { FieldSetProps, useAdminNotify } from 'admin/core';
/* hooks */
import { useLoader } from 'shared/hooks';
/* services */
import { updateReferenceService } from 'admin/tenants/services';
/* utils */
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
/* assets */
import { MdError } from 'react-icons/md';
/* styles */
import { FieldStyles } from 'shared/styles';

interface UpdateReferenceForm {
    organization: string;
    owner: string;
}

const UpdateReferenceSchema = yup
    .object({
        organization: yup.string().required('views.updatereference.form.organization.required'),
        owner: yup.string().required('views.updatereference.form.owner.required'),
    })
    .required();

export const useUpdateReference = () => {
    /* states */
    const {
        handleSubmit,
        formState: { errors },
        reset,
        register,
    } = useForm<UpdateReferenceForm>({
        mode: 'all',
        resolver: yupResolver(UpdateReferenceSchema),
    });

    const { t } = useTranslation();

    const { notify } = useAdminNotify();

    const { showLoader, hideLoader } = useLoader();

    /* functions */
    const handleUpdateReference = handleSubmit(async data => {
        showLoader();

        const service = await updateReferenceService({
            orgId: '',
            reference: {
                organizationName: data.organization,
                ownerReference: data.owner,
            },
        });

        hideLoader();

        if (service.error)
            return notify('danger', {
                title: 'Error',
                icon: <MdError />,
                timestamp: new Date(),
                text: service.message,
            });
    });

    const handleResetUpdateReferenceForm = () => reset();

    /* props */
    const organizationNameField: FieldSetProps = {
        field: {
            className: errors.organization ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            placeholder: t('views.updatereference.form.organization.placeholder'),
            ...register('organization'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: t((errors.organization?.message as string) ?? 'views.updatereference.form.organization.hint'),
            children: t((errors.organization?.message as string) ?? 'views.updatereference.form.organization.hint'),
        },
    };

    const ownerReferenceField: FieldSetProps = {
        field: {
            className: errors.owner ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            placeholder: t('views.updatereference.form.owner.placeholder'),
            ...register('owner'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: t((errors.owner?.message as string) ?? 'views.updatereference.form.owner.hint'),
            children: t((errors.owner?.message as string) ?? 'views.updatereference.form.owner.hint'),
        },
    };

    const updateReferenceFormFields: FieldSetProps[] = [organizationNameField, ownerReferenceField];

    return { handleUpdateReference, updateReferenceFormFields, handleResetUpdateReferenceForm };
};
