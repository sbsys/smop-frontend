/* react */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
/* props */
import { LinkedTitleDetailContextProps } from './LinkedTitleDetail.props';
/* context */
import { useCommerceManagementContext } from '../CommerceManagementView';
import { useCommerceMenuContext } from '../CommerceMenuView';
/* hooks */
import { useLoader } from 'shared/hooks';
import { useAdminNotify } from 'admin/core';
/* services */
import { productLinkedListService } from 'admin/linked/services';
/* types */
import { TitleProductListItemDTO } from 'admin/collections';
import { LinkMenuProduct } from 'admin/linked/types';
/* assets */
import { MdDangerous } from 'react-icons/md';
import { mainTitleProductListService } from 'admin/collections/services';

export const useLinkedTitleDetail = () => {
    /* states */
    const { titleId } = useParams<{ titleId: string }>();

    const {
        /* states */
        linkedCommerceSettings,
    } = useCommerceManagementContext();

    const {
        /* states */
        linkedTitleList,
    } = useCommerceMenuContext();

    const linkedTitle = useMemo(
        () => linkedTitleList.find(title => `${title.titleId}` === titleId),
        [linkedTitleList, titleId]
    );

    const [menuProductList, setMenuProductList] = useState<LinkMenuProduct>({
        linked: [],
        unlinked: [],
    });

    const [products, setProducts] = useState<TitleProductListItemDTO[]>([]);

    const productList = useMemo(() => {
        const list = products.slice();

        return list.reduce((prev, current) => {
            const product = menuProductList.linked.find(linked => linked.productId === current.productId);

            if (!product) return prev;

            return [...prev, { ...current, price: product.price, url: product.url }];
        }, [] as (TitleProductListItemDTO & { price: number; url: string })[]);
    }, [menuProductList.linked, products]);

    const { showLoader, hideLoader } = useLoader();

    const { notify } = useAdminNotify();

    const navigate = useNavigate();

    /* functions */
    const getProductLinkedList = useCallback(async () => {
        showLoader();

        const service = await productLinkedListService(
            linkedCommerceSettings?.commerceId ?? '',
            Number.parseInt(titleId ?? '0')
        );

        hideLoader();

        if (service.error)
            return notify('danger', {
                title: 'Error',
                icon: <MdDangerous />,
                text: service.message,
                timestamp: new Date(),
            });

        setMenuProductList(service.data);
    }, [hideLoader, linkedCommerceSettings?.commerceId, notify, showLoader, titleId]);

    const getTitleProductList = useCallback(async () => {
        showLoader();

        const service = await mainTitleProductListService(Number.parseInt(titleId ?? '0'));

        hideLoader();

        if (service.error)
            return notify('danger', {
                title: 'Error',
                icon: <MdDangerous />,
                text: service.message,
                timestamp: new Date(),
            });

        setProducts(service.data);
    }, [hideLoader, notify, showLoader, titleId]);

    const handleCloseLinkedTitleDetail = () => navigate(-1);

    /* reactivity */
    useEffect(() => {
        getProductLinkedList();
    }, [getProductLinkedList]);

    useEffect(() => {
        getTitleProductList();
    }, [getTitleProductList]);

    /* context */
    const context: LinkedTitleDetailContextProps = {
        /* states */
        linkedTitle,
        productList,
        /* functions */
        handleCloseLinkedTitleDetail,
    };

    return { context };
};
