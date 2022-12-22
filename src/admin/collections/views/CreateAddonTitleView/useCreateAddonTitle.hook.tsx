/* react */
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
/* props */
import {
    CreateAddonTitleContextProps,
    CreateAddonTitleFormData,
    CreateAddonTitleSchema,
} from './CreateAddonTitle.props';
/* hooks */
import { useLoader } from 'shared/hooks';
import { AdminLang, FieldSetProps, Lang, useAdminLang, useAdminNotify } from 'admin/core';
/* services */
import { createAddonTitleService } from 'admin/collections/services';
/* utils */
import { yupResolver } from '@hookform/resolvers/yup';
/* assets */
import { MdBookmarkAdded, MdDangerous } from 'react-icons/md';
/* styles */
import { FieldStyles } from 'shared/styles';
import styles from './CreateAddonTitle.module.scss';
import { ComplementIdToTypeMap, ComplementTypeId } from 'admin/collections/types';

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

    const { translate } = useAdminLang();

    const navigate = useNavigate();

    /* functions */
    const handleCreateAddonTitle = handleSubmit(async data => {
        showLoader();

        if (data.multiLanguage) data.defaultTitle = data.titleCollection[0].refs;
        else data.titleCollection = [];

        if (data.complementType === 1) data.maxAccuSubItem = 1;
        if (data.complementType === 2) data.maxAccuSubItem = 0;

        const service = await createAddonTitleService({
            ...data,
            titleCollection: data.titleCollection.map(title => ({
                lang: title.lang,
                ref: title.refs,
            })),
        });

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
            setValue('titleCollection.0.refs', watch('defaultTitle'));

            unregister('defaultTitle');
        } else {
            setValue('defaultTitle', watch('titleCollection.0.refs'));

            unregister('titleCollection');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setValue, unregister, watch('multiLanguage')]);

    /* props */
    const defaultTitleProps: FieldSetProps = {
        field: {
            className: errors.defaultTitle ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'text',
            placeholder: translate('createaddontitle.collection.placeholder'),
            ...register('defaultTitle'),
        },
        isHintReserved: true,
        hint: errors.defaultTitle
            ? {
                  children: translate(errors.defaultTitle.message as AdminLang),
                  hasDots: true,
                  title: translate(errors.defaultTitle.message as AdminLang),
              }
            : {
                  children: translate('createaddontitle.collection.hint'),
                  hasDots: true,
                  title: translate('createaddontitle.collection.hint'),
              },
    };
    const multiLanguageProps: FieldSetProps = {
        className: styles.CheckboxInverse,
        field: {
            className: errors.multiLanguage ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'checkbox',
            placeholder: translate('commons.allowmultilanguage'),
            ...register('multiLanguage'),
        },
        isHintReserved: true,
        hint: errors.multiLanguage
            ? {
                  children: translate(errors.multiLanguage.message as AdminLang),
                  hasDots: true,
                  title: translate(errors.multiLanguage.message as AdminLang),
              }
            : {
                  children: translate('commons.allowmultilanguage'),
                  hasDots: true,
                  title: translate('commons.allowmultilanguage'),
              },
    };
    const titleCollectionProps = (index: number, lang: Lang): FieldSetProps => {
        setValue(`titleCollection.${index}.lang`, lang);

        return {
            field: {
                className:
                    errors.titleCollection && errors.titleCollection[index]?.refs
                        ? FieldStyles.OutlineDanger
                        : FieldStyles.OutlinePrimary,
                strategy: 'text',
                placeholder: translate('createaddontitle.collection.placeholder'),
                afterContent: lang.toUpperCase(),
                ...register(`titleCollection.${index}.refs`),
            },
            isHintReserved: true,
            hint:
                errors.titleCollection && errors.titleCollection[index]?.refs
                    ? {
                          children: translate(errors.titleCollection[index]?.refs?.message as AdminLang),
                          hasDots: true,
                          title: translate(errors.titleCollection[index]?.refs?.message as AdminLang),
                      }
                    : {
                          children: translate('createaddontitle.collection.hint'),
                          hasDots: true,
                          title: translate('createaddontitle.collection.hint'),
                      },
        };
    };
    const complementTypeProps: FieldSetProps = {
        field: {
            className: errors.complementType ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'select',
            placeholder: translate('createaddontitle.type.placeholder' as AdminLang),
            options: [...Array(3)].map((_, index) => ({
                label: translate(`types.${ComplementIdToTypeMap[(index + 1) as ComplementTypeId]}`),
                value: index + 1,
            })),
            ...register('complementType'),
        },
        isHintReserved: true,
        hint: {
            children: translate((errors.complementType?.message ?? 'createaddontitle.type.hint') as AdminLang),
            hasDots: true,
            title: translate((errors.complementType?.message ?? 'createaddontitle.type.hint') as AdminLang),
        },
    };
    const maxAccuSubItemProps: FieldSetProps = {
        field: {
            className: errors.maxAccuSubItem ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'number',
            min: 2,
            max: 10,
            defaultValue: 2,
            placeholder: translate('createaddontitle.maxaccusubitem.placeholder' as AdminLang),
            ...register('maxAccuSubItem'),
        },
        isHintReserved: true,
        hint: {
            children: translate(
                (errors.maxAccuSubItem?.message ?? 'createaddontitle.maxaccusubitem.hint') as AdminLang
            ),
            hasDots: true,
            title: translate((errors.maxAccuSubItem?.message ?? 'createaddontitle.maxaccusubitem.hint') as AdminLang),
        },
    };

    const createAddonTitleFieldProps: FieldSetProps[] = [
        ...(watch('multiLanguage')
            ? [multiLanguageProps, titleCollectionProps(0, 'en'), titleCollectionProps(1, 'es')]
            : [defaultTitleProps, multiLanguageProps]),
        complementTypeProps,
        ...(`${watch('complementType')}` === '3' ? [maxAccuSubItemProps] : []),
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
