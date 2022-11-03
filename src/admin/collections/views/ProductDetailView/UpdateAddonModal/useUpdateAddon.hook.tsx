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
import { updateAddonService } from 'admin/collections/services';
/* types */
import { TitleListItemDTO, TitleRefCollection } from 'admin/collections/types';
/* assets */
import { MdAddCircle, MdCheckCircle, MdError } from 'react-icons/md';
/* styles */
import { ButtonStyles, FieldStyles } from 'shared/styles';
import styles from './UpdateAddon.module.scss';

export interface UpdateAddonFormData {
    multipleChoice: TitleRefCollection[];
    singleChoice: TitleRefCollection[];
}

export const useUpdateAddon = () => {
    /* states */
    const {
        /* states */
        product,
        addonTitleList,
        isUpdateAddon,
        hideUpdateAddon,
        /* functions */
        getProductDetail,
    } = useProductDetailContext();

    const { t, i18n } = useTranslation();

    const { notify } = useAdminNotify();

    const { showLoader, hideLoader } = useLoader();

    const { handleSubmit, reset, setValue } = useForm<UpdateAddonFormData>();

    /* accesory */
    const [accesoryCollection, setAccesoryCollection] = useState<TitleListItemDTO[]>([]);

    /* multiple choice */
    const [selectedMultipleChoiceCollection, setSelectedMultipleChoiceCollection] = useState<number | ''>('');
    const [multipleChoiceCollection, setMultipleChoiceCollection] = useState<TitleListItemDTO[]>([]);

    const handleAddToMultipleChoiceCollection = () => {
        if (!selectedMultipleChoiceCollection) return;

        const selected = addonTitleList.find(current => `${current.titleId}` === `${selectedMultipleChoiceCollection}`);

        if (!selected) return;

        setMultipleChoiceCollection(prev => [...prev, selected]);

        setSelectedMultipleChoiceCollection('');
    };

    const handleRemoveFromMultipleChoiceCollection = (titleId: number) => () => {
        setMultipleChoiceCollection(prev => [...prev.filter(current => current.titleId !== titleId)]);
    };

    /* single choice */
    const [selectedSingleChoiceCollection, setSelectedSingleChoiceCollection] = useState<number | ''>('');
    const [singleChoiceCollection, setSingleChoiceCollection] = useState<TitleListItemDTO[]>([]);

    const handleAddToSingleChoiceCollection = () => {
        if (!selectedSingleChoiceCollection) return;

        const selected = addonTitleList.find(current => `${current.titleId}` === `${selectedSingleChoiceCollection}`);

        if (!selected) return;

        setSingleChoiceCollection(prev => [...prev, selected]);

        setSelectedSingleChoiceCollection('');
    };

    const handleRemoveFromSingleChoiceCollection = (titleId: number) => () => {
        setSingleChoiceCollection(prev => [...prev.filter(current => current.titleId !== titleId)]);
    };

    /* functions */
    const handleUpdateAddon = handleSubmit(async data => {
        showLoader();

        const service = await updateAddonService(product?.productId ?? '', data);

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

        hideUpdateAddon();

        getProductDetail();
    });

    const handleResetUpdateAddon = () => {
        reset();

        hideUpdateAddon();
    };

    /* reactivity */
    useEffect(() => {
        if (!isUpdateAddon) return;

        if (!product?.accesoryCollection.length) return;

        const defaultCollection = addonTitleList.filter(accesoryTitle =>
            product.accesoryCollection.find(accesory => accesory.titleId === accesoryTitle.titleId)
        );

        setAccesoryCollection(defaultCollection);
    }, [isUpdateAddon, addonTitleList, product?.accesoryCollection]);

    useEffect(() => {
        if (!isUpdateAddon) return;

        if (!product?.multipleChoice.length) return;

        const defaultCollection = addonTitleList.filter(accesoryTitle =>
            product.multipleChoice.find(multipleChoice => multipleChoice.titleId === accesoryTitle.titleId)
        );

        setMultipleChoiceCollection(defaultCollection);
    }, [addonTitleList, isUpdateAddon, product?.multipleChoice]);

    useEffect(() => {
        if (!isUpdateAddon) return;

        if (!product?.singleChoice.length) return;

        const defaultCollection = addonTitleList.filter(accesoryTitle =>
            product.singleChoice.find(singleChoice => singleChoice.titleId === accesoryTitle.titleId)
        );

        setSingleChoiceCollection(defaultCollection);
    }, [addonTitleList, isUpdateAddon, product?.singleChoice]);

    useEffect(() => {
        setValue(
            'multipleChoice',
            multipleChoiceCollection.map(addon => ({ titleId: addon.titleId }))
        );
    }, [multipleChoiceCollection, setValue]);

    useEffect(() => {
        setValue(
            'singleChoice',
            singleChoiceCollection.map(addon => ({ titleId: addon.titleId }))
        );
    }, [singleChoiceCollection, setValue]);

    /* props */
    /* multiple choice collection */
    const multipleChoiceCollectionTitleProps: FieldSetProps = {
        className: styles.TitleProps,
        field: {
            disabled: true,
        },
        isHintReserved: true,
        hint: {
            children: t('views.productdetail.updateaddon.multiplechoicecollectiontitle.hint'),
            hasDots: true,
            title: t('views.productdetail.updateaddon.multiplechoicecollectiontitle.hint'),
        },
    };
    const multipleChoiceCollectionProps: FieldSetProps = {
        field: {
            className: FieldStyles.OutlinePrimary,
            placeholder: t('views.productdetail.updateaddon.multiplechoicecollection.placeholder'),
            value: selectedMultipleChoiceCollection,
            onChange: (event: any) => setSelectedMultipleChoiceCollection(event.target.value),
            afterContent: (
                <Button
                    onClick={handleAddToMultipleChoiceCollection}
                    className={ButtonStyles.Plain}
                    type="button"
                    title={t('views.productdetail.updateaddon.multiplechoicecollection.add')}>
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
            title: t('views.productdetail.updateaddon.multiplechoicecollection.hint'),
            children: t('views.productdetail.updateaddon.multiplechoicecollection.hint'),
        },
    };
    /* single choice collection */
    const singleChoiceCollectionTitleProps: FieldSetProps = {
        className: styles.TitleProps,
        field: {
            disabled: true,
        },
        isHintReserved: true,
        hint: {
            children: t('views.productdetail.updateaddon.singlechoicecollectiontitle.hint'),
            hasDots: true,
            title: t('views.productdetail.updateaddon.singlechoicecollectiontitle.hint'),
        },
    };
    const singleChoiceCollectionProps: FieldSetProps = {
        field: {
            className: FieldStyles.OutlinePrimary,
            placeholder: t('views.productdetail.updateaddon.singlechoicecollection.placeholder'),
            value: selectedSingleChoiceCollection,
            onChange: (event: any) => setSelectedSingleChoiceCollection(event.target.value),
            afterContent: (
                <Button
                    onClick={handleAddToSingleChoiceCollection}
                    className={ButtonStyles.Plain}
                    type="button"
                    title={t('views.productdetail.updateaddon.singlechoicecollection.add')}>
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
            title: t('views.productdetail.updateaddon.singlechoicecollection.hint'),
            children: t('views.productdetail.updateaddon.singlechoicecollection.hint'),
        },
    };

    const updateAddonMultipleChoiceCollectionFields: FieldSetProps[] = [
        multipleChoiceCollectionTitleProps,
        multipleChoiceCollectionProps,
    ];

    const updateAddonSingleChoiceCollectionFields: FieldSetProps[] = [
        singleChoiceCollectionTitleProps,
        singleChoiceCollectionProps,
    ];

    return {
        handleUpdateAddon,
        handleResetUpdateAddon,
        updateAddonMultipleChoiceCollectionFields,
        multipleChoiceCollection,
        handleRemoveFromMultipleChoiceCollection,
        updateAddonSingleChoiceCollectionFields,
        singleChoiceCollection,
        handleRemoveFromSingleChoiceCollection,
    };
};
