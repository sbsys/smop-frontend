/* react */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
/* props */
import { FieldSetProps, useAdminNotify } from 'admin/core';
/* context */
import { useProductDetailContext } from '../ProductDetail.context';
/* components */
import { Button, SelectFieldOptionProps } from 'shared/components';
/* hooks */
import { useLoader } from 'shared/hooks';
/* services */
import { updateCollectionService } from 'admin/collections/services';
/* types */
import { MainTitleListItemDTO, TitleListItemDTO, TitleRefCollection } from 'admin/collections/types';
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

    const { t, i18n } = useTranslation();

    const { notify } = useAdminNotify();

    const { showLoader, hideLoader } = useLoader();

    const { handleSubmit, reset, register, setValue, watch } = useForm<UpdateCollectionFormData>();

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
    const [accesoryCollection, setAccesoryCollection] = useState<TitleListItemDTO[]>([]);

    const [multipleChoiceCollection, setMultipleChoiceCollection] = useState<TitleListItemDTO[]>([]);
    const [singleChoiceCollection, setSingleChoiceCollection] = useState<TitleListItemDTO[]>([]);

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
    }, [accesoryCollection, setValue]);

    /* props */
    /* main collection */
    const mainCollectionTitleProps: FieldSetProps = {
        className: styles.TitleProps,
        field: {
            disabled: true,
        },
        isHintReserved: true,
        hint: {
            children: t('views.productdetail.updatecollection.maincollectiontitle.hint'),
            hasDots: true,
            title: t('views.productdetail.updatecollection.maincollectiontitle.hint'),
        },
    };
    const mainCollectionProps: FieldSetProps = {
        field: {
            className: FieldStyles.OutlinePrimary,
            placeholder: t('views.productdetail.updatecollection.maincollection.placeholder'),
            value: selectedMainCollection,
            onChange: (event: any) => setSelectedMainCollection(event.target.value),
            afterContent: (
                <Button
                    onClick={handleAddToMainCollection}
                    className={ButtonStyles.Plain}
                    type="button"
                    title={t('views.productdetail.updatecollection.maincollection.add')}>
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
                            current.titleCollection.find(collection => collection.lang === i18n.language)?.ref ??
                            current.defaultTitle,
                        value: current.titleId,
                    },
                ];
            }, [] as SelectFieldOptionProps[]),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: t('views.productdetail.updatecollection.maincollection.hint'),
            children: t('views.productdetail.updatecollection.maincollection.hint'),
        },
    };
    /* accesory collection */
    const markAsAddonProps: FieldSetProps = {
        className: styles.CheckboxInverse,
        field: {
            className: FieldStyles.OutlinePrimary,
            strategy: 'checkbox',
            placeholder: t('views.productdetail.updatecollection.markasaddon.placeholder'),
            ...register('markAsAddon'),
        },
        isHintReserved: true,
        hint: {
            children: t('views.productdetail.updatecollection.markasaddon.hint'),
            hasDots: true,
            title: t('views.productdetail.updatecollection.markasaddon.hint'),
        },
    };
    const accesoryCollectionProps: FieldSetProps = {
        field: {
            className: FieldStyles.OutlinePrimary,
            placeholder: t('views.productdetail.updatecollection.accesorycollection.placeholder'),
            value: selectedAccesoryCollection,
            onChange: (event: any) => setSelectedAccesoryCollection(event.target.value),
            afterContent: (
                <Button
                    onClick={handleAddToAccesoryCollection}
                    className={ButtonStyles.Plain}
                    type="button"
                    title={t('views.productdetail.updatecollection.accesorycollection.add')}>
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
                            current.titleCollection.find(collection => collection.lang === i18n.language)?.ref ??
                            current.defaultTitle,
                        value: current.titleId,
                    },
                ];
            }, [] as SelectFieldOptionProps[]),
        },
        isHintReserved: true,
        hint: {
            hasDots: true,
            title: t('views.productdetail.updatecollection.accesorycollection.hint'),
            children: t('views.productdetail.updatecollection.accesorycollection.hint'),
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
