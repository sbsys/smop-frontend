/* react */
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
/* props */
import { FieldSetProps, useAdminNotify } from 'admin/core';
/* hooks */
import { useLoader } from 'shared/hooks';
/* services */
import { updateSettingsService } from 'admin/tenants/services';
/* utils */
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
/* assets */
import { MdError } from 'react-icons/md';
import { TenantCoverSrc } from 'assets';
/* styles */
import { FieldStyles } from 'shared/styles';
import styles from './UpdateSettingsModal.module.scss';
import { useCallback } from 'react';

interface Language {
    languageId: string;
    preferredLanguage: boolean;
}

interface UpdateSettingsForm {
    decimals: number;
    multiLanguage: boolean;
    languages: Language[];
}

const UpdateSettingsSchema = yup
    .object({
        decimals: yup
            .number()
            .required('views.updatesettings.form.decimals.required')
            .integer('views.updatesettings.form.decimals.integer')
            .min(1, 'views.updatesettings.form.decimals.min')
            .max(4, 'views.updatesettings.form.decimals.max'),
        multiLanguage: yup.boolean().required(),
        languages: yup
            .array()
            .of(
                yup
                    .object({
                        languageId: yup.string().required(''),
                        preferredLanguage: yup.boolean().required(''),
                    })
                    .required()
            )
            .required('views.updatesettings.form.languages.required')
            .min(1, 'views.updatesettings.form.languages.min'),
    })
    .required();

export const useUpdateSettings = () => {
    /* states */
    const {
        handleSubmit,
        reset,
        formState: { errors },
        register,
        setValue,
    } = useForm<UpdateSettingsForm>({
        mode: 'all',
        resolver: yupResolver(UpdateSettingsSchema),
    });

    const { t } = useTranslation();

    const { showLoader, hideLoader } = useLoader();

    const { notify } = useAdminNotify();

    /* functions */
    const handleUpdateSettings = handleSubmit(async data => {
        showLoader();

        const service = await updateSettingsService({
            orgId: '',
            settings: data,
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

    const handleResetUpdateSettingsForm = () => reset();

    const generateLanguageField = useCallback(
        (index: number): FieldSetProps => {
            setValue(`languages.${index}.preferredLanguage`, index === 0 ? true : false);

            return {
                field: {
                    strategy: 'select',
                    placeholder: 'views.updatesettings.form.languages.placeholder',
                    options: [{ label: 'English', value: '1' }],
                    value: '1',
                    afterContent: <img src={TenantCoverSrc} alt="lang" className={styles.LangFlag} />,
                    ...register(`languages.${index}.languageId`),
                },
            };
        },
        [register, setValue]
    );

    /* props */
    const decimalsField: FieldSetProps = {
        field: {
            className: errors.decimals ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'decimal',
            defaultValue: 1,
            step: 1,
            min: 1,
            max: 4,
            placeholder: t('views.updatesettings.form.decimals.placeholder'),
            ...register('decimals'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: t((errors.decimals?.message as string) ?? 'views.updatesettings.form.decimals.hint'),
            children: t((errors.decimals?.message as string) ?? 'views.updatesettings.form.decimals.hint'),
        },
    };
    const multiLanguageField: FieldSetProps = {
        className: styles.MultiLang,
        title: t('views.updatesettings.form.multilang.description'),
        field: {
            strategy: 'checkbox',
            checked: true,
            ...register('multiLanguage'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: t((errors.multiLanguage?.message as string) ?? 'views.updatesettings.form.multilang.hint'),
            children: t((errors.multiLanguage?.message as string) ?? 'views.updatesettings.form.multilang.hint'),
        },
    };

    const updateSettingsFormFields: FieldSetProps[] = [decimalsField, multiLanguageField, generateLanguageField(0)];

    return { handleUpdateSettings, handleResetUpdateSettingsForm, updateSettingsFormFields };
};
