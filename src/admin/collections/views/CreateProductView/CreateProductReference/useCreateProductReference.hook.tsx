/* react */
import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
/* props */
import { AdminLang, FieldSetProps, FilePreview, FilePreviewProps, Lang, useAdminLang } from 'admin/core';
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

    const { translate } = useAdminLang();

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
            placeholder: translate('createproduct.references.placeholder'),
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
                  children: translate('createproduct.references.hint'),
                  hasDots: true,
                  title: translate('createproduct.references.hint'),
              },
    };
    const defaultDescriptionProps: FieldSetProps = {
        field: {
            className: errors.defaultDescription ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'text',
            placeholder: translate('createproduct.description.placeholder'),
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
                  children: translate('createproduct.description.hint'),
                  hasDots: true,
                  title: translate('createproduct.description.hint'),
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
            children: translate('createproduct.references.title'),
            hasDots: true,
            title: translate('createproduct.references.title'),
        },
    };
    const referenceCollectionProps = (index: number, lang: Lang): FieldSetProps => {
        setValue(`referenceCollection.${index}.lang`, lang);

        return {
            field: {
                className: errors.referenceCollection ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
                strategy: 'text',
                placeholder: translate('createproduct.references.placeholder'),
                afterContent: lang.toUpperCase(),
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
                      children: translate('createproduct.references.hint'),
                      hasDots: true,
                      title: translate('createproduct.references.hint'),
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
            children: translate('createproduct.description.title'),
            hasDots: true,
            title: translate('createproduct.description.title'),
        },
    };
    const descriptionCollectionProps = (index: number, lang: Lang): FieldSetProps => {
        setValue(`descriptionCollection.${index}.lang`, lang);

        return {
            field: {
                className: errors.descriptionCollection ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
                strategy: 'text',
                placeholder: translate('createproduct.description.placeholder'),
                afterContent: lang.toUpperCase(),
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
                      children: translate('createproduct.description.hint'),
                      hasDots: true,
                      title: translate('createproduct.description.hint'),
                  },
        };
    };
    const allowPromptsProps: FieldSetProps = {
        className: styles.CheckboxInverse,
        field: {
            className: errors.allowPrompts ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'checkbox',
            placeholder: translate('createproduct.allowprompts.hint'),
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
                  children: translate('createproduct.allowprompts.hint'),
                  hasDots: true,
                  title: translate('createproduct.allowprompts.hint'),
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
            placeholder: translate('createproduct.image.title'),
            ...register('includePicture'),
        },
        isHintReserved: true,
        hint: errors.includePicture
            ? {
                  children: translate(errors.includePicture.message as AdminLang),
                  hasDots: true,
                  title: translate(errors.includePicture.message as AdminLang),
              }
            : {
                  children: translate('createproduct.image.title'),
                  hasDots: true,
                  title: translate('createproduct.image.title'),
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
                            errors.image
                                ? translate(errors.image.message as AdminLang)
                                : translate('createproduct.image.hint')
                        }>
                        {errors.image
                            ? translate(errors.image.message as AdminLang)
                            : translate('createproduct.image.hint')}
                    </Legend>

                    {watch('image')?.length > 0 && (
                        <Button
                            type="button"
                            className={ButtonStyles.OutlineNone}
                            onClick={() => resetField('image')}
                            title={translate('actions.remove')}>
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
