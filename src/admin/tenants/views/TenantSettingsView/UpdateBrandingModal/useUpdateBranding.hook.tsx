/* react */
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
/* context */
import { useTenantSettingsContext } from '../TenantSettings.context';
/* components */
import { Button, Legend } from 'shared/components';
/* hooks */
import { useDragAndDropFiles, useLoader } from 'shared/hooks';
/* props */
import { AdminLang, FieldSetProps, FilePreview, FilePreviewProps, useAdminLang, useAdminNotify } from 'admin/core';
/* services */
import { updateBrandingService } from 'admin/tenants/services';
/* utils */
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { classNames } from 'shared/utils';
/* assets */
import { MdCheckCircle, MdClose, MdError } from 'react-icons/md';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './UpdateBrandingModal.module.scss';

interface UpdateBrandingForm {
    cover: FileList;
    profile: FileList;
}

const UpdateBrandingSchema = yup
    .object({
        cover: yup
            .mixed()
            .test('required', 'orgedit.cover.required', value => value && value.length > 0)
            .test('fileSize', 'orgedit.cover.size', value => value && value[0] && value[0].size <= 10000000)
            .test(
                'type',
                'orgedit.cover.type',
                value => value && value[0] && (value[0].type === 'image/jpeg' || value[0].type === 'image/png')
            ),
        profile: yup
            .mixed()
            .test('required', 'orgedit.profile.required', value => value && value.length > 0)
            .test('fileSize', 'orgedit.profile.size', value => value && value[0] && value[0].size <= 10000000)
            .test(
                'type',
                'orgedit.profile.type',
                value => value && value[0] && (value[0].type === 'image/jpeg' || value[0].type === 'image/png')
            ),
    })
    .required();

export const useUpdateBranding = () => {
    /* states */
    const {
        /* states */
        settings,
        hideUpdateBranding,
        /* functions */
        getOrganizationSettings,
    } = useTenantSettingsContext();

    const {
        register,
        handleSubmit,
        resetField,
        reset,
        watch,
        formState: { errors },
    } = useForm<UpdateBrandingForm>({
        mode: 'all',
        resolver: yupResolver(UpdateBrandingSchema),
    });

    const { translate } = useAdminLang();

    const { showLoader, hideLoader } = useLoader();

    const { notify } = useAdminNotify();

    /* update branding */
    const [updateCoverFile, isCoverDragging] = useDragAndDropFiles();
    const [updateProfileFile, isProfileDragging] = useDragAndDropFiles();

    /* functions */
    const handleUpdateBranding = handleSubmit(async data => {
        showLoader();

        const service = await updateBrandingService({
            orgId: settings?.organizationId ?? '',
            branding: {
                cover: data.cover[0],
                profile: data.profile[0],
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

        hideUpdateBranding();

        getOrganizationSettings();
    });

    const handleResetUpdateBrandingForm = () => reset();

    /* props */

    /* update branding */
    const coverPreviewProps: FilePreviewProps = useMemo(
        () => ({
            className: isCoverDragging ? styles.DraggingBorder : '',
            data: watch('cover') && watch('cover')?.length > 0 ? URL.createObjectURL(watch('cover')[0]) : undefined,
            type: watch('cover') && watch('cover')?.length > 0 ? watch('cover')[0].type : undefined,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [isCoverDragging, watch('cover')]
    );
    const updateCoverField: FieldSetProps = {
        field: {
            strategy: 'file',
            ...updateCoverFile,
            children: <FilePreview {...coverPreviewProps} />,
            ...register('cover'),
            ...{
                ref: (node: any) => {
                    register('cover').ref(node);
                    updateCoverFile.ref.current = node;
                },
            },
        },
        isHintReserved: true,
        hint: {
            className: classNames(styles.CloseImg, errors.cover && styles.NoPhotoHint),
            children: (
                <>
                    <Legend
                        hasDots
                        title={
                            errors.cover
                                ? translate(errors.cover.message as AdminLang)
                                : translate('orgedit.cover.hint')
                        }>
                        {errors.cover ? translate(errors.cover.message as AdminLang) : translate('orgedit.cover.hint')}
                    </Legend>

                    {watch('cover')?.length > 0 && (
                        <Button
                            type="button"
                            className={ButtonStyles.OutlineNone}
                            onClick={() => resetField('cover')}
                            title={translate('actions.remove')}>
                            <i>
                                <MdClose />
                            </i>
                        </Button>
                    )}
                </>
            ),
        },
    };
    const profilePreviewProps: FilePreviewProps = useMemo(
        () => ({
            className: isProfileDragging ? styles.DraggingBorder : '',
            data: watch('profile')?.length > 0 ? URL.createObjectURL(watch('profile')[0]) : undefined,
            type: watch('profile')?.length > 0 ? watch('profile')[0].type : undefined,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [isProfileDragging, watch('profile')]
    );
    const updateProfileField: FieldSetProps = {
        field: {
            strategy: 'file',
            ...updateProfileFile,
            children: <FilePreview {...profilePreviewProps} />,
            ...register('profile'),
            ...{
                ref: (node: any) => {
                    register('profile').ref(node);
                    updateProfileFile.ref.current = node;
                },
            },
        },
        isHintReserved: true,
        hint: {
            className: classNames(styles.CloseImg, errors.profile && styles.NoPhotoHint),
            children: (
                <>
                    <Legend
                        hasDots
                        title={
                            errors.profile
                                ? translate(errors.profile.message as AdminLang)
                                : translate('orgedit.profile.hint')
                        }>
                        {errors.profile
                            ? translate(errors.profile.message as AdminLang)
                            : translate('orgedit.profile.hint')}
                    </Legend>

                    {watch('profile')?.length > 0 && (
                        <Button
                            type="button"
                            className={ButtonStyles.OutlineNone}
                            onClick={() => resetField('profile')}
                            title={translate('actions.remove')}>
                            <i>
                                <MdClose />
                            </i>
                        </Button>
                    )}
                </>
            ),
        },
    };
    const updateBrandingFormFields: FieldSetProps[] = [updateCoverField, updateProfileField];

    return { updateBrandingFormFields, handleUpdateBranding, handleResetUpdateBrandingForm };
};
