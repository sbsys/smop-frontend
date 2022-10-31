/* react */
import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
/* props */
import { FieldSetProps, FilePreview, FilePreviewProps, Lang } from 'admin/core';
import { CreateProductFormData } from '../CreateProduct.props';
/* context */
import { useCreateProductContext } from '../CreateProduct.context';
/* components */
import { Button, Legend } from 'shared/components';
/* hooks */
import { useDragAndDropFiles } from 'shared/hooks';
/* utils */
import { classNames } from 'shared/utils';
/* assets */
import { MdClose } from 'react-icons/md';
/* styles */
import { ButtonStyles, FieldStyles } from 'shared/styles';
import styles from './CreateProductReference.module.scss';

export const useCreateProductReference = () => {
    /* states */
    const {
        /* functions */
        handleNextTab,
    } = useCreateProductContext();

    const {
        register,
        setValue,
        formState: { errors },
        watch,
        unregister,
        trigger,
        resetField,
    } = useFormContext<CreateProductFormData>();

    const [imageFileProps, isImageDragging] = useDragAndDropFiles();

    const { t } = useTranslation();

    /* functions */
    const handleToNextTab = async () => {
        if (
            await trigger(
                [
                    'multiLanguage',
                    'defaultReference',
                    'defaultDescription',
                    'referenceCollection',
                    'descriptionCollection',
                    'allowPrompts',
                    'includePicture',
                    'image',
                ],
                {
                    shouldFocus: true,
                }
            )
        )
            handleNextTab();
    };

    /* reactivity */
    useEffect(() => {
        if (watch('multiLanguage')) {
            setValue('referenceCollection.0.ref', watch('defaultReference'));

            unregister('defaultReference');

            setValue('descriptionCollection.0.ref', watch('defaultDescription'));

            unregister('defaultDescription');
        } else {
            setValue('defaultReference', watch('referenceCollection.0.ref'));

            unregister('referenceCollection');

            setValue('defaultDescription', watch('descriptionCollection.0.ref'));

            unregister('descriptionCollection');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setValue, unregister, watch('multiLanguage')]);

    useEffect(() => {
        if (watch('includePicture')) return;

        unregister('image');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [unregister, watch('includePicture')]);

    /* props */
    const defaultReferenceProps: FieldSetProps = {
        field: {
            className: errors.defaultReference ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'text',
            placeholder: t('views.createproduct.form.defaultreference.placeholder'),
            ...register('defaultReference'),
        },
        isHintReserved: true,
        hint: errors.defaultReference
            ? {
                  children: t(errors.defaultReference.message as string),
                  hasDots: true,
                  title: t(errors.defaultReference.message as string),
              }
            : {
                  children: t('views.createproduct.form.defaultreference.hint'),
                  hasDots: true,
                  title: t('views.createproduct.form.defaultreference.hint'),
              },
    };
    const defaultDescriptionProps: FieldSetProps = {
        field: {
            className: errors.defaultDescription ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'text',
            placeholder: t('views.createproduct.form.defaultdescription.placeholder'),
            ...register('defaultDescription'),
        },
        isHintReserved: true,
        hint: errors.defaultDescription
            ? {
                  children: t(errors.defaultDescription.message as string),
                  hasDots: true,
                  title: t(errors.defaultDescription.message as string),
              }
            : {
                  children: t('views.createproduct.form.defaultdescription.hint'),
                  hasDots: true,
                  title: t('views.createproduct.form.defaultdescription.hint'),
              },
    };
    const multiLanguageProps: FieldSetProps = {
        className: styles.CheckboxInverse,
        field: {
            className: errors.multiLanguage ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'checkbox',
            placeholder: t('views.createproduct.form.multilanguage.placeholder'),
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
                  children: t('views.createproduct.form.multilanguage.hint'),
                  hasDots: true,
                  title: t('views.createproduct.form.multilanguage.hint'),
              },
    };
    const referenceTitleProps: FieldSetProps = {
        className: styles.TitleProps,
        field: {
            disabled: true,
        },
        isHintReserved: true,
        hint: {
            children: t('views.createproduct.form.referencetitle.hint'),
            hasDots: true,
            title: t('views.createproduct.form.referencetitle.hint'),
        },
    };
    const referenceCollectionProps = (index: number, lang: Lang): FieldSetProps => {
        setValue(`referenceCollection.${index}.lang`, lang);

        return {
            field: {
                className: errors.referenceCollection ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
                strategy: 'text',
                placeholder: t('views.createproduct.form.referencecollection.placeholder'),
                afterContent: lang.toUpperCase(),
                ...register(`referenceCollection.${index}.ref`),
            },
            isHintReserved: true,
            hint: errors.referenceCollection
                ? {
                      children: t(errors.referenceCollection.message as string),
                      hasDots: true,
                      title: t(errors.referenceCollection.message as string),
                  }
                : {
                      children: t('views.createproduct.form.referencecollection.hint'),
                      hasDots: true,
                      title: t('views.createproduct.form.referencecollection.hint'),
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
            children: t('views.createproduct.form.descriptiontitle.hint'),
            hasDots: true,
            title: t('views.createproduct.form.descriptiontitle.hint'),
        },
    };
    const descriptionCollectionProps = (index: number, lang: Lang): FieldSetProps => {
        setValue(`descriptionCollection.${index}.lang`, lang);

        return {
            field: {
                className: errors.descriptionCollection ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
                strategy: 'text',
                placeholder: t('views.createproduct.form.descriptioncollection.placeholder'),
                afterContent: lang.toUpperCase(),
                ...register(`descriptionCollection.${index}.ref`),
            },
            isHintReserved: true,
            hint: errors.descriptionCollection
                ? {
                      children: t(errors.descriptionCollection.message as string),
                      hasDots: true,
                      title: t(errors.descriptionCollection.message as string),
                  }
                : {
                      children: t('views.createproduct.form.descriptioncollection.hint'),
                      hasDots: true,
                      title: t('views.createproduct.form.descriptioncollection.hint'),
                  },
        };
    };
    const allowPromptsProps: FieldSetProps = {
        className: styles.CheckboxInverse,
        field: {
            className: errors.allowPrompts ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'checkbox',
            placeholder: t('views.createproduct.form.allowprompts.placeholder'),
            ...register('allowPrompts'),
        },
        isHintReserved: true,
        hint: errors.allowPrompts
            ? {
                  children: t(errors.allowPrompts.message as string),
                  hasDots: true,
                  title: t(errors.allowPrompts.message as string),
              }
            : {
                  children: t('views.createproduct.form.allowprompts.hint'),
                  hasDots: true,
                  title: t('views.createproduct.form.allowprompts.hint'),
              },
    };

    const createProductReferenceFields: FieldSetProps[] = [
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

    const includePictureProps: FieldSetProps = {
        className: styles.CheckboxInverse,
        field: {
            className: errors.includePicture ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'checkbox',
            placeholder: t('views.createproduct.form.includepicture.placeholder'),
            ...register('includePicture'),
        },
        isHintReserved: true,
        hint: errors.includePicture
            ? {
                  children: t(errors.includePicture.message as string),
                  hasDots: true,
                  title: t(errors.includePicture.message as string),
              }
            : {
                  children: t('views.createproduct.form.includepicture.hint'),
                  hasDots: true,
                  title: t('views.createproduct.form.includepicture.hint'),
              },
    };
    const imagePreviewProps: FilePreviewProps = useMemo(
        () => ({
            className: classNames(styles.Preview, isImageDragging && styles.DraggingBorder),
            data: watch('image')?.length > 0 ? URL.createObjectURL(watch('image')[0]) : undefined,
            type: watch('image')?.length > 0 ? watch('image')[0].type : undefined,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [isImageDragging, watch('image')]
    );
    const imageProps: FieldSetProps = {
        className: styles.Preview,
        field: {
            strategy: 'file',
            ...imageFileProps,
            children: <FilePreview {...imagePreviewProps} />,
            ...register('image'),
            ...{
                ref: (node: any) => {
                    register('image').ref(node);
                    imageFileProps.ref.current = node;
                },
            },
        },
        isHintReserved: true,
        hint: {
            className: classNames(styles.CloseImg, errors.image && styles.NoPhotoHint),
            children: (
                <>
                    <Legend
                        hasDots
                        title={
                            errors.image ? t(errors.image.message as string) : t('views.createproduct.form.image.hint')
                        }>
                        {errors.image ? t(errors.image.message as string) : t('views.createproduct.form.image.hint')}
                    </Legend>

                    {watch('image')?.length > 0 && (
                        <Button
                            type="button"
                            className={ButtonStyles.OutlineNone}
                            onClick={() => resetField('image')}
                            title={t('views.createproduct.form.image.close')}>
                            <i>
                                <MdClose />
                            </i>
                        </Button>
                    )}
                </>
            ),
        },
    };

    const createProductFileFields: FieldSetProps[] = [
        includePictureProps,
        ...(watch('includePicture') ? [imageProps] : []),
    ];

    return { handleToNextTab, createProductReferenceFields, createProductFileFields };
};
