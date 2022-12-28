/* react */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
/* store */
import { selectOrganization } from 'admin/clients/store';
/* context */
import { useTitleProductListContext } from '../TitleProductList.context';
/* props */
import { FieldSetProps, useClientsLang, useClientsNotify, useClientsSelector } from 'admin/core';
/* components */
import { Button } from 'shared/components';
/* hooks */
import { useLoader } from 'shared/hooks';
/* services */
import { getTitleProductConfigService } from 'admin/clients/services';
/* utils */
import { amountFormat } from 'shared/utils';
/* types */
import { ProductConfig, ProductTitleListItem } from 'admin/clients/types';
/* assets */
import { MdAddCircle, MdDangerous, MdRemoveCircle, MdWarning } from 'react-icons/md';
/* styles */
import { ButtonStyles, FieldStyles } from 'shared/styles';
import styles from './ConfigureProduct.module.scss';

export const useConfigureProduct = () => {
    /* states */
    const org = useClientsSelector(selectOrganization);

    const {
        /* states */
        selectedProductToAdd,
        /* functions */
        handleUnSelectedProductToAddToCart,
    } = useTitleProductListContext();

    const [productConfig, setProductConfig] = useState<ProductConfig>({
        singles: [],
        multiples: [],
        combos: [],
    });

    const isSelectedProductToAdd = useMemo(() => selectedProductToAdd !== null, [selectedProductToAdd]);

    const amountRef = useRef<HTMLInputElement | null>(null);

    const [productAmount, setProductAmount] = useState<number>(1);

    const productSubTotal = useMemo(() => {
        return (selectedProductToAdd?.price ?? 0) * (productAmount || 1);
    }, [productAmount, selectedProductToAdd?.price]);

    const { showLoader, hideLoader } = useLoader();

    const { notify } = useClientsNotify();

    const { translate, lang } = useClientsLang();

    /* functions */
    const handleCloseAddToCart = useCallback(() => {
        handleUnSelectedProductToAddToCart();

        setProductAmount(1);

        setProductConfig({
            singles: [],
            multiples: [],
            combos: [],
        });
    }, [handleUnSelectedProductToAddToCart]);

    const handleAddTocart = useCallback(() => {
        if (!amountRef.current) return;

        if (!(productAmount > 0)) {
            notify('warning', {
                text: translate('cart.min'),
                timestamp: new Date(),
                icon: <MdWarning />,
                title: translate('cart.amount'),
            });

            amountRef.current.focus();
            return;
        }
    }, [notify, productAmount, translate]);

    const handleGetProductConfiguration = useCallback(async () => {
        if (!isSelectedProductToAdd) return;

        showLoader();

        const service = await getTitleProductConfigService(org?.schema ?? '', selectedProductToAdd?.productId ?? '');

        hideLoader();

        if (service.error)
            return notify('danger', {
                title: 'Error',
                icon: <MdDangerous />,
                text: service.message,
                timestamp: new Date(),
            });

        setProductConfig(service.data);
    }, [hideLoader, isSelectedProductToAdd, notify, org?.schema, selectedProductToAdd?.productId, showLoader]);

    /* reactivity */
    useEffect(() => {
        handleGetProductConfiguration();
    }, [handleGetProductConfiguration]);

    /* props */
    const singlesTitleProps = useCallback(
        (title: ProductTitleListItem, index: number): FieldSetProps[] => {
            return [
                {
                    className: styles.Title,
                    field: {
                        disabled: true,
                    },
                    hint: {
                        hasDots: true,
                        title:
                            title.titleCollection.find(collection => collection.lang === lang)?.ref ??
                            title.defaultTitle,
                        children:
                            title.titleCollection.find(collection => collection.lang === lang)?.ref ??
                            title.defaultTitle,
                    },
                },
                ...title.complements.map(
                    (complement, complementIndex) =>
                        ({
                            className: styles.Single,
                            field: {
                                strategy: 'radio',
                                name: title.defaultTitle,
                                defaultValue: complement.productId,
                                id: `single_${index}_${complementIndex}`,
                            },
                            hint: {
                                hasDots: true,
                                title:
                                    complement.referenceCollection.find(collection => collection.lang === lang)?.ref ??
                                    complement.defaultReference,
                                children: (
                                    <label htmlFor={`single_${index}_${complementIndex}`}>
                                        {complement.referenceCollection.find(collection => collection.lang === lang)
                                            ?.ref ?? complement.defaultReference}
                                    </label>
                                ),
                            },
                        } as FieldSetProps)
                ),
            ];
        },
        [lang]
    );
    const multiplesTitleProps = useCallback(
        (title: ProductTitleListItem, index: number): FieldSetProps[] => {
            return [
                {
                    className: styles.Title,
                    field: {
                        disabled: true,
                    },
                    hint: {
                        hasDots: true,
                        title:
                            title.titleCollection.find(collection => collection.lang === lang)?.ref ??
                            title.defaultTitle,
                        children:
                            title.titleCollection.find(collection => collection.lang === lang)?.ref ??
                            title.defaultTitle,
                    },
                },
                ...title.complements.map(
                    (complement, complementIndex) =>
                        ({
                            className: styles.Multiple,
                            field: {
                                strategy: 'checkbox',
                                name: title.defaultTitle,
                                id: `multiple_${index}_${complementIndex}`,
                            },
                            hint: {
                                hasDots: true,
                                title:
                                    complement.referenceCollection.find(collection => collection.lang === lang)?.ref ??
                                    complement.defaultReference,
                                children: (
                                    <label htmlFor={`multiple_${index}_${complementIndex}`}>
                                        {complement.referenceCollection.find(collection => collection.lang === lang)
                                            ?.ref ?? complement.defaultReference}
                                    </label>
                                ),
                            },
                        } as FieldSetProps)
                ),
            ];
        },
        [lang]
    );
    const combosTitleProps = useCallback(
        (title: ProductTitleListItem, index: number): FieldSetProps[] => {
            return [
                {
                    className: styles.Title,
                    field: {
                        disabled: true,
                    },
                    hint: {
                        hasDots: true,
                        title:
                            title.titleCollection.find(collection => collection.lang === lang)?.ref ??
                            title.defaultTitle,
                        children: `${
                            title.titleCollection.find(collection => collection.lang === lang)?.ref ??
                            title.defaultTitle
                        } (0/${title.maxAccuSubItem})`,
                    },
                },
                ...title.complements.map(
                    (complement, complementIndex) =>
                        ({
                            className: styles.Combo,
                            field: {
                                strategy: 'number',
                                defaultValue: 0,
                                min: 0,
                                max: /* calculated */ 1,
                                step: 1,
                                beforeContent: (
                                    <Button className={ButtonStyles.Plain} type="button">
                                        <i>
                                            <MdRemoveCircle />
                                        </i>
                                    </Button>
                                ),
                                afterContent: (
                                    <Button className={ButtonStyles.Plain} type="button">
                                        <i>
                                            <MdAddCircle />
                                        </i>
                                    </Button>
                                ),
                            },
                            hint: {
                                hasDots: true,
                                title:
                                    complement.referenceCollection.find(collection => collection.lang === lang)?.ref ??
                                    complement.defaultReference,
                                children: (
                                    <label htmlFor={`combo_${index}_${complementIndex}`}>
                                        {complement.referenceCollection.find(collection => collection.lang === lang)
                                            ?.ref ?? complement.defaultReference}
                                    </label>
                                ),
                            },
                        } as FieldSetProps)
                ),
            ];
        },
        [lang]
    );

    const allowPrompsProps: FieldSetProps[] = useMemo(
        () => [
            {
                className: styles.Title,
                field: {
                    disabled: true,
                },
                hint: {
                    hasDots: true,
                    title: 'Promps',
                    children: 'Promps',
                },
            },
            {
                field: {
                    className: FieldStyles.OutlinePrimary,
                    strategy: 'area',
                    placeholder: 'Promps',
                },
            },
        ],
        []
    );

    const productAmountProps: FieldSetProps = useMemo(
        () => ({
            field: {
                className: FieldStyles.OutlinePrimary,
                placeholder: translate('cart.amount'),
                strategy: 'decimal',
                value: productAmount,
                onChange: (event: any) =>
                    setProductAmount(event.target.value ? Math.floor(event.target.value) : event.target.value),
                afterContent: ` x $ ${amountFormat(selectedProductToAdd?.price ?? 0, 2)}`,
                min: 1,
                step: 1,
                ref: amountRef,
            },
            hint: {
                hasDots: true,
                title: translate('cart.amount'),
                children: translate('cart.amount'),
            },
        }),
        [productAmount, selectedProductToAdd?.price, translate]
    );

    const configurationFieldProps: FieldSetProps[] = [
        ...(productConfig.singles.length > 0 ? productConfig.singles.map(singlesTitleProps).flat() : []),
        ...(productConfig.multiples.length > 0 ? productConfig.multiples.map(multiplesTitleProps).flat() : []),
        ...(productConfig.combos.length > 0 ? productConfig.combos.map(combosTitleProps).flat() : []),
        ...(selectedProductToAdd?.allowPrompts ? allowPrompsProps : []),
    ];

    return {
        isSelectedProductToAdd,
        selectedProductToAdd,
        handleCloseAddToCart,
        productAmountProps,
        productSubTotal,
        handleAddTocart,
        configurationFieldProps,
    };
};
