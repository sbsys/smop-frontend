/* react */
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
/* props */
import { CreateAddonTitleContextProps, CreateAddonTitleFormData } from './CreateAddonTitle.props';
/* hooks */
import { useLoader } from 'shared/hooks';
import { FieldSetProps, Lang, useAdminNotify } from 'admin/core';
/* services */
import { createAddonTitleService } from 'admin/collections/services';
/* utils */
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
/* assets */
import { MdBookmarkAdded, MdDangerous } from 'react-icons/md';
/* styles */
import { FieldStyles } from 'shared/styles';
import styles from './CreateAddonTitle.module.scss';

const CreateAddonTitleSchema = yup.object({}).required();

export const useCreateAddonTitle = () => {
    /* states */
    const {
        formState: { errors },
        handleSubmit,
        register,
        setValue,
        unregister,
        watch,
    } = useForm<CreateAddonTitleFormData>({
        mode: 'all',
        resolver: yupResolver(CreateAddonTitleSchema),
    });

    const { showLoader, hideLoader } = useLoader();

    const { notify } = useAdminNotify();

    const { t } = useTranslation();

    const navigate = useNavigate();

    /* functions */
    const handleCreateAddonTitle = handleSubmit(async data => {
        showLoader();

        if (data.multiLanguage) data.defaultTitle = data.titleCollection[0].ref;
        else data.titleCollection = [];

        const service = await createAddonTitleService({ ...data });

        hideLoader();

        if (service.error)
            return notify('danger', {
                title: 'Error',
                icon: <MdDangerous />,
                text: service.message,
                timestamp: new Date(),
            });

        notify('success', {
            title: 'Created',
            icon: <MdBookmarkAdded />,
            text: service.message,
            timestamp: new Date(),
        });

        navigate(-1);
    });

    const handleCalcelCreateAddonTitle = () => navigate(-1);

    /* reactivity */
    useEffect(() => {
        if (watch('multiLanguage')) {
            setValue('titleCollection.0.ref', watch('defaultTitle'));

            unregister('defaultTitle');
        } else {
            setValue('defaultTitle', watch('titleCollection.0.ref'));

            unregister('titleCollection');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setValue, unregister, watch('multiLanguage')]);

    /* props */
    const defaultTitleProps: FieldSetProps = {
        field: {
            className: errors.defaultTitle ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'text',
            placeholder: t('views.createaddontitle.form.defaulttitle.placeholder'),
            ...register('defaultTitle'),
        },
        isHintReserved: true,
        hint: errors.defaultTitle
            ? {
                  children: t(errors.defaultTitle.message as string),
                  hasDots: true,
                  title: t(errors.defaultTitle.message as string),
              }
            : {
                  children: t('views.createaddontitle.form.defaulttitle.hint'),
                  hasDots: true,
                  title: t('views.createaddontitle.form.defaulttitle.hint'),
              },
    };
    const multiLanguageProps: FieldSetProps = {
        className: styles.CheckboxInverse,
        field: {
            className: errors.multiLanguage ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'checkbox',
            placeholder: t('views.createaddontitle.form.multilanguage.placeholder'),
            ...register('multiLanguage'),
        },
        isHintReserved: true,
        hint: errors.multiLanguage
            ? {
                  children: t(errors.multiLanguage.message as string),
                  hasDots: true,
                  title: t(errors.multiLanguage.message as string),
              }
            : {
                  children: t('views.createaddontitle.form.multilanguage.hint'),
                  hasDots: true,
                  title: t('views.createaddontitle.form.multilanguage.hint'),
              },
    };
    const titleCollectionProps = (index: number, lang: Lang): FieldSetProps => {
        setValue(`titleCollection.${index}.lang`, lang);

        return {
            field: {
                className: errors.titleCollection ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
                strategy: 'text',
                placeholder: t('views.createaddontitle.form.titlecollection.placeholder'),
                afterContent: lang.toUpperCase(),
                ...register(`titleCollection.${index}.ref`),
            },
            isHintReserved: true,
            hint: errors.titleCollection
                ? {
                      children: t(errors.titleCollection.message as string),
                      hasDots: true,
                      title: t(errors.titleCollection.message as string),
                  }
                : {
                      children: t('views.createaddontitle.form.titlecollection.hint'),
                      hasDots: true,
                      title: t('views.createaddontitle.form.titlecollection.hint'),
                  },
        };
    };

    const createAddonTitleFieldProps: FieldSetProps[] = [
        ...(watch('multiLanguage')
            ? [multiLanguageProps, titleCollectionProps(0, 'en'), titleCollectionProps(1, 'es')]
            : [defaultTitleProps, multiLanguageProps]),
    ];

    /* context */
    const context: CreateAddonTitleContextProps = {
        /* states */
        /* functions */
        handleCreateAddonTitle,
        handleCalcelCreateAddonTitle,
        /* props */
        createAddonTitleFieldProps,
    };

    return { context };
};
