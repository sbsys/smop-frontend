/* react */
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
/* props */
import { UpdateAddonTitleFormData, UpdateAddonTitleSchema } from '../AddonsTitleList.props';
/* context */
import { useAddonsTitleListContext } from '../AddonsTitleList.context';
/* hooks */
import { useLoader } from 'shared/hooks';
import { AdminLang, FieldSetProps, Lang, useAdminLang, useAdminNotify } from 'admin/core';
/* services */
import { updateAddonTitleService } from 'admin/collections/services';
/* utils */
import { yupResolver } from '@hookform/resolvers/yup';
/* assets */
import { MdCheckCircle, MdDangerous } from 'react-icons/md';
/* styles */
import { FieldStyles } from 'shared/styles';
import styles from './UpdateAddonTitle.module.scss';

export const useUpdateAddonTitle = () => {
    /* states */
    const {
        /* states */
        selectedTitleToUpdate,
        /* functions */
        getTitleList,
        handleUnselectTitleToUpdate,
    } = useAddonsTitleListContext();

    const {
        formState: { errors },
        handleSubmit,
        register,
        reset,
        setValue,
        watch,
    } = useForm<UpdateAddonTitleFormData>({
        mode: 'all',
        resolver: yupResolver(UpdateAddonTitleSchema),
    });

    const { showLoader, hideLoader } = useLoader();

    const { notify } = useAdminNotify();

    const { translate } = useAdminLang();

    /* functions */
    const handleCancelUpdateAddonTitle = () => {
        reset();

        handleUnselectTitleToUpdate();
    };

    const handleUpdateAddonTitle = handleSubmit(async data => {
        showLoader();

        if (data.multiLanguage) data.defaultTitle = data.titleCollection[0].refs;
        else data.titleCollection = [];

        const service = await updateAddonTitleService(selectedTitleToUpdate?.titleId ?? 0, {
            ...data,
            titleCollection: data.titleCollection.map(title => ({
                lang: title.lang,
                ref: title.refs,
            })),
            isActive: selectedTitleToUpdate?.isActive === 'active',
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
            title: 'Success',
            icon: <MdCheckCircle />,
            text: service.message,
            timestamp: new Date(),
        });

        handleCancelUpdateAddonTitle();

        getTitleList();
    });

    const setAddonTitleDefaults = useCallback(() => {
        if (selectedTitleToUpdate === null) return;

        setValue('defaultTitle', selectedTitleToUpdate.defaultTitle);
        setValue('multiLanguage', selectedTitleToUpdate.multiLanguage);

        if (!selectedTitleToUpdate.multiLanguage) return;

        selectedTitleToUpdate.titleCollection.forEach((collection, index) => {
            setValue(`titleCollection.${index}.lang`, collection.lang);

            setValue(`titleCollection.${index}.refs`, collection.ref);
        });
    }, [selectedTitleToUpdate, setValue]);

    /* reactivity */
    useEffect(() => {
        setAddonTitleDefaults();
    }, [setAddonTitleDefaults]);

    /* props */
    const defaultTitleProps: FieldSetProps = {
        field: {
            className: errors.defaultTitle ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'text',
            placeholder: translate('addontitleedit.collection.placeholder'),
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
                  children: translate('addontitleedit.collection.hint'),
                  hasDots: true,
                  title: translate('addontitleedit.collection.hint'),
              },
    };
    const multiLanguageProps: FieldSetProps = {
        className: styles.CheckboxInverse,
        field: {
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
                placeholder: translate('addontitleedit.collection.placeholder'),
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
                          children: translate('addontitleedit.collection.hint'),
                          hasDots: true,
                          title: translate('addontitleedit.collection.hint'),
                      },
        };
    };

    const UpdateAddonTitleFieldProps: FieldSetProps[] = [
        ...(watch('multiLanguage')
            ? [
                  multiLanguageProps,
                  ...((selectedTitleToUpdate?.titleCollection.length ?? 0) > 0
                      ? selectedTitleToUpdate?.titleCollection.map((collection, index) =>
                            titleCollectionProps(index, collection.lang as Lang)
                        ) ?? []
                      : [titleCollectionProps(0, 'en'), titleCollectionProps(1, 'es')]),
              ]
            : [defaultTitleProps, multiLanguageProps]),
    ];

    return { handleCancelUpdateAddonTitle, handleUpdateAddonTitle, UpdateAddonTitleFieldProps };
};
