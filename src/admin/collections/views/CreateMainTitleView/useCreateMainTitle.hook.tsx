/* react */
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
/* props */
import { CreateMainTitleContextProps, CreateMainTitleFormData, CreateMainTitleSchema } from './CreateMainTitle.props';
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
import { createMainTitleService } from 'admin/collections/services';
/* utils */
import { yupResolver } from '@hookform/resolvers/yup';
import { classNames } from 'shared/utils';
/* assets */
import { MdBookmarkAdded, MdClose, MdDangerous } from 'react-icons/md';
/* styles */
import { ButtonStyles, FieldStyles } from 'shared/styles';
import styles from './CreateMainTitle.module.scss';

export const useCreateMainTitle = () => {
    /* states */
    const {
        formState: { errors },
        handleSubmit,
        register,
        setValue,
        unregister,
        watch,
        resetField,
    } = useForm<CreateMainTitleFormData>({
        mode: 'all',
        resolver: yupResolver(CreateMainTitleSchema),
    });

    const [imageFileProps, isImageDragging] = useDragAndDropFiles();

    const { showLoader, hideLoader } = useLoader();

    const { notify } = useAdminNotify();

    const { translate } = useAdminLang();

    const navigate = useNavigate();

    /* functions */
    const handleCreateMainTitle = handleSubmit(async data => {
        showLoader();

        if (data.multiLanguage) data.defaultTitle = data.titleCollection[0].refs;
        else data.titleCollection = [];

        const service = await createMainTitleService({
            ...data,
            titleCollection: data.titleCollection.map(title => ({
                lang: title.lang,
                ref: title.refs,
            })),
            serviceMode: 1,
            servedOn: '-',
            image: data.image[0],
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

    const handleCalcelCreateMainTitle = () => navigate(-1);

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
            placeholder: translate('createmaintitle.collection.placeholder'),
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
                  children: translate('createmaintitle.collection.hint'),
                  hasDots: true,
                  title: translate('createmaintitle.collection.hint'),
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
                placeholder: translate('createmaintitle.collection.placeholder'),
                afterContent: lang.toUpperCase(),
                ...register(`titleCollection.${index}.refs`),
            },
            isHintReserved: true,
            hint:
                errors.titleCollection && errors.titleCollection[index]?.refs
                    ? {
                          children: translate(
                              errors.titleCollection && (errors.titleCollection[index]?.refs?.message as AdminLang)
                          ),
                          hasDots: true,
                          title: translate(
                              errors.titleCollection && (errors.titleCollection[index]?.refs?.message as AdminLang)
                          ),
                      }
                    : {
                          children: translate('createmaintitle.collection.hint'),
                          hasDots: true,
                          title: translate('createmaintitle.collection.hint'),
                      },
        };
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
                                : translate('createmaintitle.image.hint')
                        }>
                        {errors.image
                            ? translate(errors.image.message as AdminLang)
                            : translate('createmaintitle.image.hint')}
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

    const createMainTitleFieldProps: FieldSetProps[] = [
        ...(watch('multiLanguage')
            ? [multiLanguageProps, titleCollectionProps(0, 'en'), titleCollectionProps(1, 'es')]
            : [defaultTitleProps, multiLanguageProps]),
        imageProps,
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
