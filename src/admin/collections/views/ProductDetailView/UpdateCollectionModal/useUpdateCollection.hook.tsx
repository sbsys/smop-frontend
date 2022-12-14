/* react */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
/* props */
import { AdminLang, FieldSetProps, useAdminLang, useAdminNotify } from 'admin/core';
/* context */
import { useProductDetailContext } from '../ProductDetail.context';
/* components */
import { Button, SelectFieldOptionProps } from 'shared/components';
/* hooks */
import { useLoader } from 'shared/hooks';
/* services */
import { updateCollectionService } from 'admin/collections/services';
/* utils */
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
/* types */
import { MainTitleListItemDTO, ComplementTitleListItemDTO, TitleRefCollection } from 'admin/collections/types';
/* assets */
import { MdAddCircle, MdCheckCircle, MdError } from 'react-icons/md';
/* styles */
import { ButtonStyles, FieldStyles } from 'shared/styles';
import styles from './UpdateCollection.module.scss';

export interface UpdateCollectionFormData {
    mainCollection: TitleRefCollection[];
    markAsAddon: boolean;
    accesoryCollection: TitleRefCollection[];
}

const UpdateCollectionSchema = yup.object({
    /* collections */
    mainCollection: yup.array().of(
        yup.object({
            titleId: yup.number().required(),
        })
    ),
    markAsAddon: yup.boolean().required(),
    accesoryCollection: yup.mixed().when(['markAsAddon'], {
        is: (markAsAddon: boolean) => markAsAddon,
        then: yup
            .array()
            .of(
                yup.object({
                    titleId: yup
                        .number()
                        .typeError('productedit.addon.required' as AdminLang)
                        .required('productedit.addon.required' as AdminLang),
                })
            )
            .required('productedit.addon.required' as AdminLang)
            .min(1, 'productedit.addon.required' as AdminLang),
        otherwise: yup.array().of(
            yup.object({
                titleId: yup
                    .number()
                    .typeError('productedit.addon.required' as AdminLang)
                    .required('productedit.addon.required' as AdminLang),
            })
        ),
    }),
});

export const useUpdateCollection = () => {
    /* states */
    const {
        /* states */
        product,
        mainTitleList,
        addonTitleList,
        isUpdateCollection,
        hideUpdateCollection,
        /* functions */
        getProductDetail,
    } = useProductDetailContext();

    const { translate, lang } = useAdminLang();

    const { notify } = useAdminNotify();

    const { showLoader, hideLoader } = useLoader();

    const {
        handleSubmit,
        reset,
        register,
        setValue,
        watch,
        formState: { errors },
        trigger,
    } = useForm<UpdateCollectionFormData>({
        mode: 'all',
        resolver: yupResolver(UpdateCollectionSchema),
    });

    /* main collection */
    const [selectedMainCollection, setSelectedMainCollection] = useState<number | ''>('');
    const [mainCollection, setMainCollection] = useState<MainTitleListItemDTO[]>([]);

    const handleAddToMainCollection = () => {
        if (!selectedMainCollection) return;

        const selected = mainTitleList.find(current => `${current.titleId}` === `${selectedMainCollection}`);

        if (!selected) return;

        setMainCollection(prev => [...prev, selected]);

        setSelectedMainCollection('');
    };

    const handleRemoveFromMainCollection = (titleId: number) => () => {
        setMainCollection(prev => [...prev.filter(current => current.titleId !== titleId)]);
    };

    /* accesory */
    const [selectedAccesoryCollection, setSelectedAccesoryCollection] = useState<number | ''>('');
    const [accesoryCollection, setAccesoryCollection] = useState<ComplementTitleListItemDTO[]>([]);

    const [multipleChoiceCollection, setMultipleChoiceCollection] = useState<ComplementTitleListItemDTO[]>([]);
    const [singleChoiceCollection, setSingleChoiceCollection] = useState<ComplementTitleListItemDTO[]>([]);

    const handleAddToAccesoryCollection = () => {
        if (!selectedAccesoryCollection) return;

        const selected = addonTitleList.find(current => `${current.titleId}` === `${selectedAccesoryCollection}`);

        if (!selected) return;

        setAccesoryCollection(prev => [...prev, selected]);

        setSelectedAccesoryCollection('');
    };

    const handleRemoveFromAccesoryCollection = (titleId: number) => () => {
        setAccesoryCollection(prev => [...prev.filter(current => current.titleId !== titleId)]);
    };

    /* functions */
    const handleUpdateCollection = handleSubmit(async data => {
        showLoader();

        const service = await updateCollectionService(product?.productId ?? '', data);

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

        hideUpdateCollection();

        getProductDetail();
    });

    const handleResetUpdateCollection = () => {
        reset();

        hideUpdateCollection();
    };

    /* reactivity */
    useEffect(() => {
        if (!isUpdateCollection) return;

        if (!product?.mainCollection.length) return;

        const defaultCollection = mainTitleList.filter(mainTitle =>
            product.mainCollection.find(main => main.titleId === mainTitle.titleId)
        );

        setMainCollection(defaultCollection);
    }, [isUpdateCollection, mainTitleList, product?.mainCollection]);

    useEffect(() => {
        if (!isUpdateCollection) return;

        setValue('markAsAddon', product?.markAsAddon ?? true);
    }, [isUpdateCollection, product?.markAsAddon, setValue]);

    useEffect(() => {
        if (watch('markAsAddon')) return;

        setAccesoryCollection([]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch('markAsAddon')]);

    useEffect(() => {
        if (!isUpdateCollection) return;

        if (!product?.accesoryCollection.length) return;

        const defaultCollection = addonTitleList.filter(accesoryTitle =>
            product.accesoryCollection.find(accesory => accesory.titleId === accesoryTitle.titleId)
        );

        setAccesoryCollection(defaultCollection);
    }, [isUpdateCollection, addonTitleList, product?.accesoryCollection]);

    useEffect(() => {
        if (!isUpdateCollection) return;

        if (!product?.multipleChoice.length) return;

        const defaultCollection = addonTitleList.filter(accesoryTitle =>
            product.multipleChoice.find(multipleChoice => multipleChoice.titleId === accesoryTitle.titleId)
        );

        setMultipleChoiceCollection(defaultCollection);
    }, [addonTitleList, isUpdateCollection, product?.multipleChoice]);

    useEffect(() => {
        if (!isUpdateCollection) return;

        if (!product?.singleChoice.length) return;

        const defaultCollection = addonTitleList.filter(accesoryTitle =>
            product.singleChoice.find(singleChoice => singleChoice.titleId === accesoryTitle.titleId)
        );

        setSingleChoiceCollection(defaultCollection);
    }, [addonTitleList, isUpdateCollection, product?.singleChoice]);

    useEffect(() => {
        setValue(
            'mainCollection',
            mainCollection.map(main => ({ titleId: main.titleId }))
        );
    }, [mainCollection, setValue]);

    useEffect(() => {
        setValue(
            'accesoryCollection',
            accesoryCollection.map(accesory => ({ titleId: accesory.titleId }))
        );

        trigger('accesoryCollection');
    }, [accesoryCollection, setValue, trigger]);

    /* props */
    /* main collection */
    const mainCollectionTitleProps: FieldSetProps = {
        className: styles.TitleProps,
        field: {
            disabled: true,
        },
        isHintReserved: true,
        hint: {
            children: translate('productedit.main.title'),
            hasDots: true,
            title: translate('productedit.main.title'),
        },
    };
    const mainCollectionProps: FieldSetProps = {
        field: {
            className: FieldStyles.OutlinePrimary,
            placeholder: translate('productedit.main.placeholder'),
            value: selectedMainCollection,
            onChange: (event: any) => setSelectedMainCollection(event.target.value),
            afterContent: (
                <Button
                    onClick={handleAddToMainCollection}
                    className={ButtonStyles.Plain}
                    type="button"
                    title={translate('actions.add')}>
                    <i>
                        <MdAddCircle />
                    </i>
                </Button>
            ),
            strategy: 'select',
            options: mainTitleList.reduce((prev, current) => {
                if (mainCollection.find(selected => `${selected.titleId}` === `${current.titleId}`)) return prev;

                return [
                    ...prev,
                    {
                        label:
                            current.titleCollection.find(collection => collection.lang === lang)?.ref ??
                            current.defaultTitle,
                        value: current.titleId,
                    },
                ];
            }, [] as SelectFieldOptionProps[]),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: translate('productedit.main.hint'),
            children: translate('productedit.main.hint'),
        },
    };
    /* accesory collection */
    const markAsAddonProps: FieldSetProps = {
        className: styles.CheckboxInverse,
        field: {
            strategy: 'checkbox',
            placeholder: translate('productedit.markasaddon.hint'),
            ...register('markAsAddon'),
        },
        isHintReserved: true,
        hint: {
            children: translate('productedit.markasaddon.hint'),
            hasDots: true,
            title: translate('productedit.markasaddon.hint'),
        },
    };
    const accesoryCollectionProps: FieldSetProps = {
        field: {
            className: errors.accesoryCollection ? FieldStyles.OutlineDanger : FieldStyles.OutlinePrimary,
            placeholder: translate('productedit.addon.placeholder'),
            value: selectedAccesoryCollection,
            onChange: (event: any) => setSelectedAccesoryCollection(event.target.value),
            afterContent: (
                <Button
                    onClick={handleAddToAccesoryCollection}
                    className={ButtonStyles.Plain}
                    type="button"
                    title={translate('actions.add')}>
                    <i>
                        <MdAddCircle />
                    </i>
                </Button>
            ),
            strategy: 'select',
            options: addonTitleList.reduce((prev, current) => {
                if (
                    [...accesoryCollection, ...multipleChoiceCollection, ...singleChoiceCollection].find(
                        selected => `${selected.titleId}` === `${current.titleId}`
                    )
                )
                    return prev;

                return [
                    ...prev,
                    {
                        label:
                            current.titleCollection.find(collection => collection.lang === lang)?.ref ??
                            current.defaultTitle,
                        value: current.titleId,
                    },
                ];
            }, [] as SelectFieldOptionProps[]),
        },
        isHintReserved: true,
        hint: errors.accesoryCollection
            ? {
                  hasDots: true,
                  title: translate(errors.accesoryCollection.message as AdminLang),
                  children: translate(errors.accesoryCollection.message as AdminLang),
              }
            : {
                  hasDots: true,
                  title: translate('productedit.addon.hint'),
                  children: translate('productedit.addon.hint'),
              },
    };

    const updateMainCollectionFields: FieldSetProps[] = [mainCollectionTitleProps, mainCollectionProps];

    const updateAccesoryCollectionFields: FieldSetProps[] = [
        markAsAddonProps,
        ...(watch('markAsAddon') ? [accesoryCollectionProps] : []),
    ];

    return {
        handleUpdateCollection,
        handleResetUpdateCollection,
        updateMainCollectionFields,
        mainCollection,
        handleRemoveFromMainCollection,
        markAsAddon: watch('markAsAddon'),
        updateAccesoryCollectionFields,
        accesoryCollection,
        handleRemoveFromAccesoryCollection,
    };
};
