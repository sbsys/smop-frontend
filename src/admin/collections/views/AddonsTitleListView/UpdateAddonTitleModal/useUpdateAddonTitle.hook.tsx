/* react */
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
/* props */
import { UpdateAddonTitleFormData } from '../AddonsTitleList.props';
/* context */
import { useAddonsTitleListContext } from '../AddonsTitleList.context';
/* hooks */
import { useLoader } from 'shared/hooks';
import { FieldSetProps, Lang, useAdminNotify } from 'admin/core';
/* services */
import { updateAddonTitleService } from 'admin/collections/services';
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
    } = useForm<UpdateAddonTitleFormData>();

    const { showLoader, hideLoader } = useLoader();

    const { notify } = useAdminNotify();

    const { t } = useTranslation();

    /* functions */
    const handleCancelUpdateAddonTitle = () => {
        reset();

        handleUnselectTitleToUpdate();
    };

    const handleUpdateAddonTitle = handleSubmit(async data => {
        showLoader();

        if (data.multiLanguage) data.defaultTitle = data.titleCollection[0].ref;
        else data.titleCollection = [];

        const service = await updateAddonTitleService(selectedTitleToUpdate?.titleId ?? 0, {
            ...data,
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

            setValue(`titleCollection.${index}.ref`, collection.ref);
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
            placeholder: t('views.addontitlelist.update.defaulttitle.placeholder'),
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
                  children: t('views.addontitlelist.update.defaulttitle.hint'),
                  hasDots: true,
                  title: t('views.addontitlelist.update.defaulttitle.hint'),
              },
    };
    const multiLanguageProps: FieldSetProps = {
        className: styles.CheckboxInverse,
        field: {
            className: errors.multiLanguage ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'checkbox',
            placeholder: t('views.addontitlelist.update.multilanguage.placeholder'),
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
                  children: t('views.addontitlelist.update.multilanguage.hint'),
                  hasDots: true,
                  title: t('views.addontitlelist.update.multilanguage.hint'),
              },
    };
    const titleCollectionProps = (index: number, lang: Lang): FieldSetProps => {
        setValue(`titleCollection.${index}.lang`, lang);

        return {
            field: {
                className: errors.titleCollection ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
                strategy: 'text',
                placeholder: t('views.addontitlelist.update.titlecollection.placeholder'),
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
                      children: t('views.addontitlelist.update.titlecollection.hint'),
                      hasDots: true,
                      title: t('views.addontitlelist.update.titlecollection.hint'),
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
