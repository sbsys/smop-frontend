/* react */
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
/* props */
import { ProductDetailContextProps } from './ProductDetail.props';
/* hooks */
import { useLoader } from 'shared/hooks';
import { useAdminNotify } from 'admin/core';
/* services */
import { addonsTitleListService, mainTitleListService, productDetailService } from 'admin/collections/services';
/* types */
import { MainTitleListItemDTO, ProductDetailDTO, TitleListItemDTO } from 'admin/collections/types';
/* assets */
import { MdDangerous, MdError } from 'react-icons/md';

export const useProductDetail = () => {
    /* states */
    const { productId } = useParams<{ productId: string }>();

    const [product, setProduct] = useState<ProductDetailDTO | null>(null);

    const [mainTitleList, setMainTitleList] = useState<MainTitleListItemDTO[]>([]);
    const [addonTitleList, setAddonTitleList] = useState<TitleListItemDTO[]>([]);

    const { showLoader, hideLoader } = useLoader();

    const { notify } = useAdminNotify();

    /* functions */
    const getProductDetail = useCallback(async () => {
        showLoader();

        const service = await productDetailService({ productId: productId ?? '' });

        hideLoader();

        if (service.error)
            return notify('danger', {
                title: 'Error',
                icon: <MdDangerous />,
                text: service.message,
                timestamp: new Date(),
            });

        setProduct(service.data);
    }, [productId, hideLoader, notify, showLoader]);

    const getMainTitleList = useCallback(async () => {
        showLoader();

        const service = await mainTitleListService();

        hideLoader();

        if (service.error)
            return notify('danger', {
                title: 'Error',
                icon: <MdError />,
                timestamp: new Date(),
                text: service.message,
            });

        setMainTitleList(service.data);
    }, [hideLoader, notify, showLoader]);

    const getAddonTitleList = useCallback(async () => {
        showLoader();

        const service = await addonsTitleListService();

        hideLoader();

        if (service.error)
            return notify('danger', {
                title: 'Error',
                icon: <MdError />,
                timestamp: new Date(),
                text: service.message,
            });

        setAddonTitleList(service.data);
    }, [hideLoader, notify, showLoader]);

    /* reactivity */
    useEffect(() => {
        getProductDetail();
    }, [getProductDetail]);

    useEffect(() => {
        getMainTitleList();
    }, [getMainTitleList]);

    useEffect(() => {
        getAddonTitleList();
    }, [getAddonTitleList]);

    /* props */

    /* context */
    const context: ProductDetailContextProps = {
        /* states */
        product,
        mainTitleList,
        addonTitleList,
        /* functions */
        getProductDetail,
        getMainTitleList,
        getAddonTitleList,
    };

    return { context };
};
