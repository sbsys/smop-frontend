/* react */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
/* context */
import { useTitleProductListContext } from '../TitleProductList.context';
/* props */
import { FieldSetProps, useClientsLang, useClientsNotify } from 'admin/core';
/* hooks */
import { useLoader } from 'shared/hooks';
/* utils */
import { amountFormat } from 'shared/utils';
/* assets */
import { MdDangerous, MdWarning } from 'react-icons/md';
/* styles */
import { FieldStyles } from 'shared/styles';

export const useConfigureProduct = () => {
    /* states */
    const {
        /* states */
        selectedProductToAdd,
        /* functions */
        handleUnSelectedProductToAddToCart,
    } = useTitleProductListContext();

    const isSelectedProductToAdd = useMemo(() => selectedProductToAdd !== null, [selectedProductToAdd]);

    const amountRef = useRef<HTMLInputElement | null>(null);

    const [productAmount, setProductAmount] = useState<number>(1);

    const productSubTotal = useMemo(() => {
        return (selectedProductToAdd?.price ?? 0) * (productAmount || 1);
    }, [productAmount, selectedProductToAdd?.price]);

    const { showLoader, hideLoader } = useLoader();

    const { notify } = useClientsNotify();

    const { translate } = useClientsLang();

    /* functions */
    const handleCloseAddToCart = useCallback(() => {
        handleUnSelectedProductToAddToCart();

        setProductAmount(1);
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

        const service = await { error: true, message: 'Product configuration', data: {} };

        hideLoader();

        if (service.error)
            return notify('danger', {
                title: 'Error',
                icon: <MdDangerous />,
                text: service.message,
                timestamp: new Date(),
            });
    }, [hideLoader, isSelectedProductToAdd, notify, showLoader]);

    /* reactivity */
    useEffect(() => {
        handleGetProductConfiguration();
    }, [handleGetProductConfiguration]);

    /* props */
    const productAmountProps: FieldSetProps = useMemo(
        () => ({
            field: {
                className: FieldStyles.OutlineSecondary,
                placeholder: translate('cart.amount'),
                strategy: 'number',
                value: productAmount,
                onChange: (event: any) => setProductAmount(event.target.value),
                afterContent: ` x $ ${amountFormat(selectedProductToAdd?.price ?? 0, 2)}`,
                min: 1,
                step: 1,
                ref: amountRef,
            },
            hint: {
                title: translate('cart.amount'),
                children: translate('cart.amount'),
            },
        }),
        [productAmount, selectedProductToAdd?.price, translate]
    );

    return {
        isSelectedProductToAdd,
        selectedProductToAdd,
        handleCloseAddToCart,
        productAmountProps,
        productSubTotal,
        handleAddTocart,
    };
};
