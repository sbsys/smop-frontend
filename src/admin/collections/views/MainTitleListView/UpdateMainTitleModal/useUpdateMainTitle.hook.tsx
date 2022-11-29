/* react */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
/* props */
import { UpdateMainTitleFormData, UpdateMainTitleSchema } from '../MainTitleList.props';
/* context */
import { useMainTitleListContext } from '../MainTitleList.context';
/* components */
import { Button, Legend } from 'shared/components';
/* hooks */
import { useDragAndDropFiles, useLoader } from 'shared/hooks';
import {
    AdminLang,
    FieldSetProps,
    FilePreview,
    FilePreviewProps,
    Lang,
    useAdminLang,
    useAdminNotify,
} from 'admin/core';
/* services */
import { updateMainTitleService } from 'admin/collections/services';
/* utils */
import { yupResolver } from '@hookform/resolvers/yup';
import { classNames } from 'shared/utils';
/* assets */
import { MdCheckCircle, MdClose, MdDangerous } from 'react-icons/md';
/* styles */
import { ButtonStyles, FieldStyles } from 'shared/styles';
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
        resetField,
    } = useForm<UpdateMainTitleFormData>({
        mode: 'all',
        resolver: yupResolver(UpdateMainTitleSchema),
    });

    const [imageFileProps, isImageDragging, setImage] = useDragAndDropFiles();

    const [currentImage, setCurrentImage] = useState<File | null>(null);

    const currentImageURL = useMemo(() => {
        const toReturn = {
            hasImage: currentImage ? true : false,
            url: '',
            type: '',
        };

        if (!currentImage) return toReturn;

        toReturn.url = URL.createObjectURL(currentImage);
        toReturn.type = currentImage.type;

        return toReturn;
    }, [currentImage]);

    const { showLoader, hideLoader } = useLoader();

    const { notify } = useAdminNotify();

    const { translate } = useAdminLang();

    /* functions */
    const handleCancelUpdateMainTitle = () => {
        reset({
            defaultTitle: '',
            multiLanguage: false,
            titleCollection: [],
            image: undefined,
        });
        setCurrentImage(null);

        handleUnselectTitleToUpdate();
    };

    const handleUpdateMainTitle = handleSubmit(async data => {
        showLoader();

        if (data.multiLanguage) data.defaultTitle = data.titleCollection[0].refs;
        else data.titleCollection = [];

        const imageToSet = data.image && data.image.length > 0 ? data.image[0] : currentImage;

        if (!imageToSet) {
            notify('danger', {
                title: 'Conflict',
                icon: <MdDangerous />,
                text: 'Current image type validation',
                timestamp: new Date(),
            });

            return hideLoader();
        }

        const service = await updateMainTitleService(selectedTitleToUpdate?.titleId ?? 0, {
            ...data,
            titleCollection: data.titleCollection.map(title => ({
                lang: title.lang,
                ref: title.refs,
            })),
            serviceMode: selectedTitleToUpdate?.serviceMode ?? 1,
            servedOn: selectedTitleToUpdate?.servedOn ?? '-',
            isActive: selectedTitleToUpdate?.isActive === 'active',
            image: imageToSet,
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

    const setMainTitleDefaults = useCallback(async () => {
        if (selectedTitleToUpdate === null) return;

        setValue('defaultTitle', selectedTitleToUpdate.defaultTitle);
        setValue('multiLanguage', selectedTitleToUpdate.multiLanguage);

        showLoader();

        const image = await fetch(selectedTitleToUpdate?.url ?? '')
            .then(data => data.blob())
            .catch(error => error);

        if (image?.type !== 'image/jpeg' && image?.type !== 'image/png') {
            notify('danger', {
                title: 'Conflict',
                icon: <MdDangerous />,
                text: 'Current image type validation',
                timestamp: new Date(),
            });

            return hideLoader();
        }

        const imageFile = new File([image], 'image', { type: image.type });

        setCurrentImage(imageFile);
        setImage([imageFile]);

        hideLoader();

        if (!selectedTitleToUpdate.multiLanguage) return;

        selectedTitleToUpdate.titleCollection.forEach((collection, index) => {
            setValue(`titleCollection.${index}.lang`, collection.lang);

            setValue(`titleCollection.${index}.refs`, collection.ref);
        });
    }, [hideLoader, notify, selectedTitleToUpdate, setImage, setValue, showLoader]);

    /* reactivity */
    useEffect(() => {
        setMainTitleDefaults();
    }, [setMainTitleDefaults]);

    /* props */
    const defaultTitleProps: FieldSetProps = {
        field: {
            className: errors.defaultTitle ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            strategy: 'text',
            placeholder: translate('maintitleedit.collection.placeholder'),
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
                  children: translate('maintitleedit.collection.hint'),
                  hasDots: true,
                  title: translate('maintitleedit.collection.hint'),
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
                placeholder: translate('maintitleedit.collection.placeholder'),
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
                          children: translate('maintitleedit.collection.hint'),
                          hasDots: true,
                          title: translate('maintitleedit.collection.hint'),
                      },
        };
    };

    const imagePreviewProps: FilePreviewProps = useMemo(
        () => {
            const toReturn = {
                className: classNames(styles.Preview, isImageDragging && styles.DraggingBorder),
                data: /* currentImageURL.hasImage ? currentImageURL.url :  */ '',
                type: /* currentImageURL.hasImage ? currentImageURL.type :  */ '',
            };

            if (watch('image')?.length > 0) {
                toReturn.data = URL.createObjectURL(watch('image')[0]);
                toReturn.type = watch('image')[0].type;
            }

            return toReturn;
        },
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
                                : translate('maintitleedit.image.hint')
                        }>
                        {errors.image
                            ? translate(errors.image.message as AdminLang)
                            : translate('maintitleedit.image.hint')}
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
        imageProps,
    ];

    return { handleCancelUpdateMainTitle, handleUpdateMainTitle, UpdateMainTitleFieldProps, currentImageURL };
};
