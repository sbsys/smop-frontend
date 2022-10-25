/* react */
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
/* props */
import { CreateMainTitleContextProps, CreateMainTitleFormData } from './CreateMainTitle.props';
/* hooks */
import { useLoader } from 'shared/hooks';
import { FieldSetProps, Lang, useAdminNotify } from 'admin/core';
/* utils */
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
/* assets */
import { MdBookmarkAdded, MdDangerous } from 'react-icons/md';
import { FieldStyles } from 'shared/styles';
import styles from './CreateMainTitle.module.scss';

const CreateMainTitleSchema = yup.object({}).required();

export const useCreateMainTitle = () => {
    /* states */
    const {
        formState: { errors },
        handleSubmit,
        register,
        setFocus,
        setValue,
        trigger,
        watch,
    } = useForm<CreateMainTitleFormData>({
        mode: 'all',
        resolver: yupResolver(CreateMainTitleSchema),
    });

    const { showLoader, hideLoader } = useLoader();

    const { notify } = useAdminNotify();

    const { t } = useTranslation();

    const navigate = useNavigate();

    /* functions */
    const handleCreateMainTitle = handleSubmit(async data => {
        showLoader();

        const service = await { error: true, message: 'Create main title message' };

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

    const handleCalcelCreateMainTitle = () => navigate(-1);

    /* reactivity */

    /* props */
    const defaultTitleProps: FieldSetProps = {
        field: {
            className: errors.defaultTitle ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'text',
            placeholder: t('views.createmaintitle.form.defaulttitle.placeholder'),
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
                  children: t('views.createmaintitle.form.defaulttitle.hint'),
                  hasDots: true,
                  title: t('views.createmaintitle.form.defaulttitle.hint'),
              },
    };
    const multiLanguageProps: FieldSetProps = {
        className: styles.CheckboxInverse,
        field: {
            className: errors.multiLanguage ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'checkbox',
            placeholder: t('views.createmaintitle.form.multilanguage.placeholder'),
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
                  children: t('views.createmaintitle.form.multilanguage.hint'),
                  hasDots: true,
                  title: t('views.createmaintitle.form.multilanguage.hint'),
              },
    };
    const titleCollectionProps = (index: number, lang: Lang): FieldSetProps => {
        setValue(`titleCollection.${index}.lang`, lang);

        return {
            field: {
                className: errors.titleCollection ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
                strategy: 'text',
                placeholder: t('views.createmaintitle.form.titlecollection.placeholder'),
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
                      children: t('views.createmaintitle.form.titlecollection.hint'),
                      hasDots: true,
                      title: t('views.createmaintitle.form.titlecollection.hint'),
                  },
        };
    };

    const createMainTitleFieldProps: FieldSetProps[] = [
        ...(watch('multiLanguage')
            ? [multiLanguageProps, titleCollectionProps(0, 'en'), titleCollectionProps(1, 'es')]
            : [defaultTitleProps, multiLanguageProps]),
    ];

    /* context */
    const context: CreateMainTitleContextProps = {
        /* states */
        /* functions */
        handleCreateMainTitle,
        handleCalcelCreateMainTitle,
        /* props */
        createMainTitleFieldProps,
    };

    return { context };
};
