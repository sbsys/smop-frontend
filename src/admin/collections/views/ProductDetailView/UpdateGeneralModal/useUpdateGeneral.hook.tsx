/* react */
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
/* props */
import { AdminLang, FieldSetProps, Lang, useAdminLang, useAdminNotify } from 'admin/core';
/* context */
import { useProductDetailContext } from '../ProductDetail.context';
/* hooks */
import { useLoader } from 'shared/hooks';
/* services */
import { updateGeneralService } from 'admin/collections/services';
/* types */
import { ProductFeature, TitleCollection } from 'admin/collections/types';
/* assets */
import { MdCheckCircle, MdError } from 'react-icons/md';
/* styles */
import { FieldStyles } from 'shared/styles';
import styles from './UpdateGeneral.module.scss';

export interface UpdateGeneralFormData {
    /* references */
    defaultReference: string;
    defaultDescription: string;
    multiLanguage: boolean;
    referenceCollection: TitleCollection[];
    descriptionCollection: TitleCollection[];
    allowPrompts: boolean;
    /* feature */
    feature?: ProductFeature[];
}

export const useUpdateGeneral = () => {
    /* states */
    const {
        /* states */
        product,
        isUpdateGeneral,
        hideUpdateGeneral,
        /* functions */
        getProductDetail,
    } = useProductDetailContext();

    const { translate } = useAdminLang();

    const { notify } = useAdminNotify();

    const { showLoader, hideLoader } = useLoader();

    const {
        handleSubmit,
        reset,
        register,
        formState: { errors },
        setValue,
        watch,
    } = useForm<UpdateGeneralFormData>();

    /* functions */
    const handleUpdateGeneral = handleSubmit(async data => {
        showLoader();

        if (data.multiLanguage) {
            data.defaultReference = data.referenceCollection[0].ref;
            data.defaultDescription = data.descriptionCollection[0].ref;
        } else {
            data.referenceCollection = [];
            data.descriptionCollection = [];
        }

        if (product?.feature) data.feature = [product?.feature];
        else data.feature = [];

        const service = await updateGeneralService(product?.productId ?? '', {
            ...data,
            isActive: product?.isActive === 'active',
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

        hideUpdateGeneral();

        getProductDetail();
    });

    const handleResetUpdateGeneral = () => {
        reset();

        hideUpdateGeneral();
    };

    /* reactivity */
    useEffect(() => {
        if (isUpdateGeneral) setValue('multiLanguage', product?.multiLanguage ?? false);
    }, [isUpdateGeneral, product?.multiLanguage, setValue]);

    useEffect(() => {
        if (isUpdateGeneral) setValue('allowPrompts', product?.allowPrompts ?? false);
    }, [isUpdateGeneral, product?.allowPrompts, setValue]);

    /* props */
    const defaultReferenceProps: FieldSetProps = {
        field: {
            className: errors.defaultReference ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'text',
            placeholder: translate('productedit.references.placeholder'),
            defaultValue: product?.defaultReference,
            ...register('defaultReference'),
        },
        isHintReserved: true,
        hint: errors.defaultReference
            ? {
                  children: translate(errors.defaultReference.message as AdminLang),
                  hasDots: true,
                  title: translate(errors.defaultReference.message as AdminLang),
              }
            : {
                  children: translate('productedit.references.hint'),
                  hasDots: true,
                  title: translate('productedit.references.hint'),
              },
    };
    const defaultDescriptionProps: FieldSetProps = {
        field: {
            className: errors.defaultDescription ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'text',
            placeholder: translate('productedit.description.placeholder'),
            defaultValue: product?.defaultDescription,
            ...register('defaultDescription'),
        },
        isHintReserved: true,
        hint: errors.defaultDescription
            ? {
                  children: translate(errors.defaultDescription.message as AdminLang),
                  hasDots: true,
                  title: translate(errors.defaultDescription.message as AdminLang),
              }
            : {
                  children: translate('productedit.description.hint'),
                  hasDots: true,
                  title: translate('productedit.description.hint'),
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
    const referenceTitleProps: FieldSetProps = {
        className: styles.TitleProps,
        field: {
            disabled: true,
        },
        isHintReserved: true,
        hint: {
            children: translate('productedit.references.title'),
            hasDots: true,
            title: translate('productedit.references.title'),
        },
    };
    const referenceCollectionProps = (index: number, lang: Lang): FieldSetProps => {
        setValue(`referenceCollection.${index}.lang`, lang);

        return {
            field: {
                className: errors.referenceCollection ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
                strategy: 'text',
                placeholder: translate('productedit.references.placeholder'),
                afterContent: lang.toUpperCase(),
                defaultValue: product?.referenceCollection.find(ref => ref.lang === lang)?.ref,
                ...register(`referenceCollection.${index}.ref`),
            },
            isHintReserved: true,
            hint: errors.referenceCollection
                ? {
                      children: translate(errors.referenceCollection.message as AdminLang),
                      hasDots: true,
                      title: translate(errors.referenceCollection.message as AdminLang),
                  }
                : {
                      children: translate('productedit.references.hint'),
                      hasDots: true,
                      title: translate('productedit.references.hint'),
                  },
        };
    };
    const descriptionTitleProps: FieldSetProps = {
        className: styles.TitleProps,
        field: {
            disabled: true,
        },
        isHintReserved: true,
        hint: {
            children: translate('productedit.description.title'),
            hasDots: true,
            title: translate('productedit.description.title'),
        },
    };
    const descriptionCollectionProps = (index: number, lang: Lang): FieldSetProps => {
        setValue(`descriptionCollection.${index}.lang`, lang);

        return {
            field: {
                className: errors.descriptionCollection ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
                strategy: 'text',
                placeholder: translate('productedit.description.placeholder'),
                afterContent: lang.toUpperCase(),
                defaultValue: product?.descriptionCollection.find(ref => ref.lang === lang)?.ref,
                ...register(`descriptionCollection.${index}.ref`),
            },
            isHintReserved: true,
            hint: errors.descriptionCollection
                ? {
                      children: translate(errors.descriptionCollection.message as AdminLang),
                      hasDots: true,
                      title: translate(errors.descriptionCollection.message as AdminLang),
                  }
                : {
                      children: translate('productedit.description.hint'),
                      hasDots: true,
                      title: translate('productedit.description.hint'),
                  },
        };
    };
    const allowPromptsProps: FieldSetProps = {
        className: styles.CheckboxInverse,
        field: {
            className: errors.allowPrompts ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'checkbox',
            placeholder: translate('productedit.allowprompts.hint'),
            ...register('allowPrompts'),
        },
        isHintReserved: true,
        hint: errors.allowPrompts
            ? {
                  children: translate(errors.allowPrompts.message as AdminLang),
                  hasDots: true,
                  title: translate(errors.allowPrompts.message as AdminLang),
              }
            : {
                  children: translate('productedit.allowprompts.hint'),
                  hasDots: true,
                  title: translate('productedit.allowprompts.hint'),
              },
    };

    const updateGeneralFields: FieldSetProps[] = [
        ...(watch('multiLanguage')
            ? [
                  multiLanguageProps,
                  referenceTitleProps,
                  referenceCollectionProps(0, 'en'),
                  referenceCollectionProps(1, 'es'),
                  descriptionTitleProps,
                  descriptionCollectionProps(0, 'en'),
                  descriptionCollectionProps(1, 'es'),
              ]
            : [multiLanguageProps, defaultReferenceProps, defaultDescriptionProps]),
        allowPromptsProps,
    ];

    return { handleUpdateGeneral, handleResetUpdateGeneral, updateGeneralFields };
};
