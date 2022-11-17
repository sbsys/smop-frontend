import { useForm } from 'react-hook-form';
/* context */
import { useTenantSettingsContext } from '../TenantSettings.context';
/* props */
import { AdminLang, FieldSetProps, useAdminLang, useAdminNotify } from 'admin/core';
/* hooks */
import { useLoader } from 'shared/hooks';
/* services */
import { updateReferenceService } from 'admin/tenants/services';
/* utils */
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
/* assets */
import { MdCheckCircle, MdError } from 'react-icons/md';
/* styles */
import { FieldStyles } from 'shared/styles';

interface UpdateReferenceForm {
    organization: string;
    owner: string;
}

const UpdateReferenceSchema = yup
    .object({
        organization: yup.string().required('orgedit.org.required'),
        owner: yup.string().required('orgedit.owner.required'),
    })
    .required();

export const useUpdateReference = () => {
    /* states */
    const {
        /* states */
        settings,
        hideUpdateReference,
        /* functions */
        getOrganizationSettings,
    } = useTenantSettingsContext();

    const {
        handleSubmit,
        formState: { errors },
        reset,
        register,
    } = useForm<UpdateReferenceForm>({
        mode: 'all',
        resolver: yupResolver(UpdateReferenceSchema),
    });

    const { translate } = useAdminLang();

    const { notify } = useAdminNotify();

    const { showLoader, hideLoader } = useLoader();

    /* functions */
    const handleUpdateReference = handleSubmit(async data => {
        showLoader();

        const service = await updateReferenceService({
            orgId: settings?.organizationId ?? '',
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

        notify('success', {
            title: 'Success',
            icon: <MdCheckCircle />,
            timestamp: new Date(),
            text: service.message,
        });

        hideUpdateReference();

        getOrganizationSettings();
    });

    const handleResetUpdateReferenceForm = () => reset();

    /* props */
    const organizationNameField: FieldSetProps = {
        field: {
            className: errors.organization ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            placeholder: translate('orgedit.org.placeholder'),
            defaultValue: settings?.organizationName,
            ...register('organization'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: translate((errors.organization?.message as AdminLang) ?? 'orgedit.org.hint'),
            children: translate((errors.organization?.message as AdminLang) ?? 'orgedit.org.hint'),
        },
    };

    const ownerReferenceField: FieldSetProps = {
        field: {
            className: errors.owner ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            placeholder: translate('orgedit.owner.placeholder'),
            defaultValue: settings?.ownerReference,
            ...register('owner'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: translate((errors.owner?.message as AdminLang) ?? 'orgedit.owner.hint'),
            children: translate((errors.owner?.message as AdminLang) ?? 'orgedit.owner.hint'),
        },
    };

    const updateReferenceFormFields: FieldSetProps[] = [organizationNameField, ownerReferenceField];

    return { handleUpdateReference, updateReferenceFormFields, handleResetUpdateReferenceForm };
};
