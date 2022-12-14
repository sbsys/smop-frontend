/* react */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
/* props */
import { FieldSetProps, useAdminLang, useAdminNotify } from 'admin/core';
/* context */
import { useProductDetailContext } from '../ProductDetail.context';
/* components */
import { Button, Legend, SelectFieldOptionProps } from 'shared/components';
/* hooks */
import { useLoader } from 'shared/hooks';
/* services */
import { updateAddonService } from 'admin/collections/services';
/* utils */
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
/* types */
import { ComplementTitleListItemDTO, TitleRefCollection } from 'admin/collections/types';
/* assets */
import { MdAddCircle, MdCheckCircle, MdError } from 'react-icons/md';
/* styles */
import { FieldStyles } from 'shared/styles';
import styles from './UpdateAddon.module.scss';

export interface UpdateAddonFormData {
    multipleChoice: TitleRefCollection[];
    singleChoice: TitleRefCollection[];
}

const UpdateAddonSchema = yup.object({
    multipleChoice: yup.array().of(
        yup.object({
            titleId: yup.number().required(),
        })
    ),
    singleChoice: yup.array().of(
        yup.object({
            titleId: yup.number().required(),
        })
    ),
});

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

    const { translate, lang } = useAdminLang();

    const { notify } = useAdminNotify();

    const { showLoader, hideLoader } = useLoader();

    const { handleSubmit, reset, setValue } = useForm<UpdateAddonFormData>({
        mode: 'all',
        resolver: yupResolver(UpdateAddonSchema),
    });

    /* accesory */
    const [accesoryCollection, setAccesoryCollection] = useState<ComplementTitleListItemDTO[]>([]);

    /* multiple choice */
    const [selectedMultipleChoiceCollection, setSelectedMultipleChoiceCollection] = useState<number | ''>('');
    const [multipleChoiceCollection, setMultipleChoiceCollection] = useState<ComplementTitleListItemDTO[]>([]);

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
    const [singleChoiceCollection, setSingleChoiceCollection] = useState<ComplementTitleListItemDTO[]>([]);

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
            children: translate('productedit.multiple.title'),
            hasDots: true,
            title: translate('productedit.multiple.title'),
        },
    };
    const multipleChoiceCollectionProps: FieldSetProps = {
        field: {
            className: FieldStyles.OutlinePrimary,
            placeholder: translate('productedit.multiple.placeholder'),
            value: selectedMultipleChoiceCollection,
            onChange: (event: any) => setSelectedMultipleChoiceCollection(event.target.value),
            afterContent: (
                <Button
                    onClick={handleAddToMultipleChoiceCollection}
                    className={styles.AddAction}
                    type="button"
                    title={translate('actions.add')}>
                    <Legend>{translate('actions.add')}</Legend>

                    <i>
                        <MdAddCircle />
                    </i>
                </Button>
            ),
            strategy: 'select',
            options: addonTitleList
                .filter(title => title.type === 'multiple')
                .reduce((prev, current) => {
                    if (
                        [...accesoryCollection, ...multipleChoiceCollection].find(
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
        hint: {
            hasDots: true,
            title: translate('productedit.multiple.hint'),
            children: translate('productedit.multiple.hint'),
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
            children: translate('productedit.single.title'),
            hasDots: true,
            title: translate('productedit.single.title'),
        },
    };
    const singleChoiceCollectionProps: FieldSetProps = {
        field: {
            className: FieldStyles.OutlinePrimary,
            placeholder: translate('productedit.single.placeholder'),
            value: selectedSingleChoiceCollection,
            onChange: (event: any) => setSelectedSingleChoiceCollection(event.target.value),
            afterContent: (
                <Button
                    onClick={handleAddToSingleChoiceCollection}
                    className={styles.AddAction}
                    type="button"
                    title={translate('actions.add')}>
                    <Legend>{translate('actions.add')}</Legend>

                    <i>
                        <MdAddCircle />
                    </i>
                </Button>
            ),
            strategy: 'select',
            options: addonTitleList
                .filter(title => title.type === 'single')
                .reduce((prev, current) => {
                    if (
                        [...accesoryCollection, ...singleChoiceCollection].find(
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
        hint: {
            hasDots: true,
            title: translate('productedit.single.hint'),
            children: translate('productedit.single.hint'),
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
