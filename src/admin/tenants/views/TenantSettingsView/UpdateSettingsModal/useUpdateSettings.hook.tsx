/* react */
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
/* context */
import { useTenantSettingsContext } from '../TenantSettings.context';
/* props */
import { AdminLang, FieldSetProps, useAdminLang, useAdminNotify } from 'admin/core';
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
            .typeError('orgedit.decimals.integer')
            .required('orgedit.decimals.integer')
            .integer('orgedit.decimals.integer')
            .min(1, 'orgedit.decimals.min')
            .max(4, 'orgedit.decimals.max'),
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
            .required('orgedit.languages.required')
            .min(1, 'orgedit.languages.min'),
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

    const { translate } = useAdminLang();

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
                    placeholder: translate('orgedit.languages.hint'),
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
        [register, setValue, settings?.internationalization, translate]
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
            placeholder: translate('orgedit.decimals.placeholder'),
            ...register('decimals'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: translate((errors.decimals?.message as AdminLang) ?? 'orgedit.decimals.hint'),
            children: translate((errors.decimals?.message as AdminLang) ?? 'orgedit.decimals.hint'),
        },
    };
    const multiLanguageField: FieldSetProps = {
        className: styles.MultiLang,
        title: translate('commons.allowmultilanguage'),
        field: {
            strategy: 'checkbox',
            checked: true,
            ...register('multiLanguage'),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: translate((errors.multiLanguage?.message as AdminLang) ?? 'commons.allowmultilanguage'),
            children: translate((errors.multiLanguage?.message as AdminLang) ?? 'commons.allowmultilanguage'),
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
