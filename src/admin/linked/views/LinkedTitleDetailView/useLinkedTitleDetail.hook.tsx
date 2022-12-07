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
import { mainTitleProductListService } from 'admin/collections/services';
import { productLinkedListService } from 'admin/linked/services';
/* types */
import { ProductState, TitleProductListItemDTO } from 'admin/collections';
import { LinkedMenuProduct } from 'admin/linked/types';
/* assets */
import { MdDangerous } from 'react-icons/md';

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

    const [menuProductList, setMenuProductList] = useState<LinkedMenuProduct[]>([]);

    const [products, setProducts] = useState<TitleProductListItemDTO[]>([]);

    const productList = useMemo(() => {
        const list = products.slice();

        return list.reduce((prev, current) => {
            const product = menuProductList.find(linked => linked.productId === current.productId);

            if (!product) return prev;

            return [
                ...prev,
                {
                    ...current,
                    isActive: (product.isAvailable ? 'active' : 'inactive') as ProductState,
                    price: product.price,
                    url: product.url,
                },
            ];
        }, [] as (TitleProductListItemDTO & { price: number; url: string })[]);
    }, [menuProductList, products]);

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

    const handleEditLinkedTitleDetail = () => navigate(`../${titleId}/edit`, { replace: true });

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
        handleEditLinkedTitleDetail,
    };

    return { context };
};
