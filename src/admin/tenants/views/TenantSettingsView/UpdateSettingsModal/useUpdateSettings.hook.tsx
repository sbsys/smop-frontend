/* react */
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
/* context */
import { useTenantSettingsContext } from '../TenantSettings.context';
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
import { MdCheckCircle, MdError } from 'react-icons/md';
/* styles */
import { FieldStyles } from 'shared/styles';
import styles from './UpdateSettingsModal.module.scss';

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
        /* states */
        settings,
        hideUpdateSettings,
        /* functions */
        getOrganizationSettings,
    } = useTenantSettingsContext();

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
            orgId: settings?.organizationId ?? '',
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

        notify('success', {
            title: 'Success',
            icon: <MdCheckCircle />,
            timestamp: new Date(),
            text: service.message,
        });

        hideUpdateSettings();

        getOrganizationSettings();
    });

    const handleResetUpdateSettingsForm = () => reset();

    const generateLanguageField = useCallback(
        (index: number): FieldSetProps => {
            setValue(`languages.${index}.preferredLanguage`, index === 0 ? true : false);

            return {
                field: {
                    strategy: 'select',
                    placeholder: 'views.updatesettings.form.languages.placeholder',
                    options: [
                        ...(settings?.internationalization.map(internationalization => ({
                            label: internationalization.abbreviation,
                            value: internationalization.id,
                        })) ?? []),
                    ],
                    value: settings?.internationalization[index].id,
                    afterContent: (
                        <img
                            src={settings?.internationalization[index].flagpng}
                            alt="lang"
                            className={styles.LangFlag}
                        />
                    ),
                    ...register(`languages.${index}.languageId`),
                },
                disabled: true,
            };
        },
        [register, setValue, settings?.internationalization]
    );

    /* props */
    const decimalsField: FieldSetProps = {
        field: {
            className: errors.decimals ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'decimal',
            defaultValue: settings?.decimals,
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
        disabled: true,
    };

    const updateSettingsFormFields: FieldSetProps[] = [
        decimalsField,
        multiLanguageField,
        ...(settings?.internationalization.map((_, index) => generateLanguageField(index)) ?? []),
    ];

    return { handleUpdateSettings, handleResetUpdateSettingsForm, updateSettingsFormFields };
};
