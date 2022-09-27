/* react */
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
/* components */
import { Button, Legend } from 'shared/components';
/* hooks */
import { useDragAndDropFiles } from 'shared/hooks';
/* props */
import { FieldSetProps, FilePreview, FilePreviewProps } from 'admin/core';
/* utils */
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { classNames } from 'shared/utils';
/* assets */
import { MdClose } from 'react-icons/md';
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
            .test('required', 'views.updatebranding.form.cover.required', value => value && value.length > 0)
            .test(
                'fileSize',
                'views.updatebranding.form.cover.size',
                value => value && value[0] && value[0].size <= 10000000
            )
            .test(
                'type',
                'views.updatebranding.form.cover.type',
                value => value && value[0] && (value[0].type === 'image/jpeg' || value[0].type === 'image/png')
            ),
        profile: yup
            .mixed()
            .test('required', 'views.updatebranding.form.profile.required', value => value && value.length > 0)
            .test(
                'fileSize',
                'views.updatebranding.form.profile.size',
                value => value && value[0] && value[0].size <= 10000000
            )
            .test(
                'type',
                'views.updatebranding.form.profile.type',
                value => value && value[0] && (value[0].type === 'image/jpeg' || value[0].type === 'image/png')
            ),
    })
    .required();

export const useUpdateBranding = () => {
    /* states */
    const {
        register,
        handleSubmit,
        resetField,
        watch,
        formState: { errors },
    } = useForm<UpdateBrandingForm>({
        mode: 'all',
        resolver: yupResolver(UpdateBrandingSchema),
    });

    const { t } = useTranslation();

    /* update branding */
    const [updateCoverFile, isCoverDragging] = useDragAndDropFiles();
    const [updateProfileFile, isProfileDragging] = useDragAndDropFiles();

    /* functions */
    const handleUpdateBranding = handleSubmit(data => {
        console.log(data);
    });

    /* props */

    /* update branding */
    const coverPreviewProps: FilePreviewProps = {
        className: isCoverDragging ? styles.DraggingBorder : '',
        data: watch('cover') && watch('cover')?.length > 0 ? URL.createObjectURL(watch('cover')[0]) : undefined,
        type: watch('cover') && watch('cover')?.length > 0 ? watch('cover')[0].type : undefined,
    };
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
                            errors.cover ? t(errors.cover.message as string) : t('views.updatebranding.form.cover.hint')
                        }>
                        {errors.cover ? t(errors.cover.message as string) : t('views.updatebranding.form.cover.hint')}
                    </Legend>

                    {watch('cover')?.length > 0 && (
                        <Button
                            type="button"
                            className={ButtonStyles.OutlineNone}
                            onClick={() => resetField('cover')}
                            title={t('views.updatebranding.form.cover.close')}>
                            <i>
                                <MdClose />
                            </i>
                        </Button>
                    )}
                </>
            ),
        },
    };
    const profilePreviewProps: FilePreviewProps = {
        className: isProfileDragging ? styles.DraggingBorder : '',
        data: watch('profile')?.length > 0 ? URL.createObjectURL(watch('profile')[0]) : undefined,
        type: watch('profile')?.length > 0 ? watch('profile')[0].type : undefined,
    };
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
                                ? t(errors.profile.message as string)
                                : t('views.updatebranding.form.profile.hint')
                        }>
                        {errors.profile
                            ? t(errors.profile.message as string)
                            : t('views.updatebranding.form.profile.hint')}
                    </Legend>

                    {watch('profile')?.length > 0 && (
                        <Button
                            type="button"
                            className={ButtonStyles.OutlineNone}
                            onClick={() => resetField('profile')}
                            title={t('views.updatebranding.form.profile.close')}>
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

    return { updateBrandingFormFields, handleUpdateBranding };
};
