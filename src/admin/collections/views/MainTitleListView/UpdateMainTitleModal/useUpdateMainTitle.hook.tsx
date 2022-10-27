/* react */
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
/* props */
import { UpdateMainTitleFormData } from '../MainTitleList.props';
/* context */
import { useMainTitleListContext } from '../MainTitleList.context';
/* hooks */
import { useLoader } from 'shared/hooks';
import { FieldSetProps, Lang, useAdminNotify } from 'admin/core';
/* services */
import { updateMainTitleService } from 'admin/collections/services';
/* assets */
import { MdCheckCircle, MdDangerous } from 'react-icons/md';
/* styles */
import { FieldStyles } from 'shared/styles';
import styles from './UpdateMainTitle.module.scss';

export const useUpdateMainTitle = () => {
    /* states */
    const {
        /* states */
        selectedTitleToUpdate,
        /* functions */
        getTitleList,
        handleUnselectTitleToUpdate,
    } = useMainTitleListContext();

    const {
        formState: { errors },
        handleSubmit,
        register,
        reset,
        setValue,
        watch,
    } = useForm<UpdateMainTitleFormData>();

    const { showLoader, hideLoader } = useLoader();

    const { notify } = useAdminNotify();

    const { t } = useTranslation();

    /* functions */
    const handleCancelUpdateMainTitle = () => {
        reset();

        handleUnselectTitleToUpdate();
    };

    const handleUpdateMainTitle = handleSubmit(async data => {
        showLoader();

        if (data.multiLanguage) data.defaultTitle = data.titleCollection[0].ref;
        else data.titleCollection = [];

        const service = await updateMainTitleService(selectedTitleToUpdate?.titleId ?? 0, {
            ...data,
            serviceMode: selectedTitleToUpdate?.serviceMode ?? 1,
            servedOn: selectedTitleToUpdate?.servedOn ?? '-',
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

        handleCancelUpdateMainTitle();

        getTitleList();
    });

    const setMainTitleDefaults = useCallback(() => {
        if (selectedTitleToUpdate === null) return;
        console.log(selectedTitleToUpdate);

        setValue('defaultTitle', selectedTitleToUpdate.defaultTitle);
        setValue('multiLanguage', selectedTitleToUpdate.multiLanguage);

        if (!selectedTitleToUpdate.multiLanguage) return;

        selectedTitleToUpdate.titleCollection.forEach((collection, index) => {
            console.log(collection);
            setValue(`titleCollection.${index}.lang`, collection.lang);
            setValue(`titleCollection.${index}.ref`, collection.ref);
        });
    }, [selectedTitleToUpdate, setValue]);

    /* reactivity */
    useEffect(() => {
        setMainTitleDefaults();
    }, [setMainTitleDefaults]);

    /* props */
    const defaultTitleProps: FieldSetProps = {
        field: {
            className: errors.defaultTitle ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'text',
            placeholder: t('views.maintitlelist.update.defaulttitle.placeholder'),
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
                  children: t('views.maintitlelist.update.defaulttitle.hint'),
                  hasDots: true,
                  title: t('views.maintitlelist.update.defaulttitle.hint'),
              },
    };
    const multiLanguageProps: FieldSetProps = {
        className: styles.CheckboxInverse,
        field: {
            className: errors.multiLanguage ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'checkbox',
            placeholder: t('views.maintitlelist.update.multilanguage.placeholder'),
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
                  children: t('views.maintitlelist.update.multilanguage.hint'),
                  hasDots: true,
                  title: t('views.maintitlelist.update.multilanguage.hint'),
              },
    };
    const titleCollectionProps = (index: number, lang: Lang): FieldSetProps => {
        setValue(`titleCollection.${index}.lang`, lang);

        return {
            field: {
                className: errors.titleCollection ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
                strategy: 'text',
                placeholder: t('views.maintitlelist.update.titlecollection.placeholder'),
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
                      children: t('views.maintitlelist.update.titlecollection.hint'),
                      hasDots: true,
                      title: t('views.maintitlelist.update.titlecollection.hint'),
                  },
        };
    };

    const UpdateMainTitleFieldProps: FieldSetProps[] = [
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

    return { handleCancelUpdateMainTitle, handleUpdateMainTitle, UpdateMainTitleFieldProps };
};
