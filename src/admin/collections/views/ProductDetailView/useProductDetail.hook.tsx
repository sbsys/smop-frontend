/* react */
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
/* props */
import { ProductDetailContextProps } from './ProductDetail.props';
/* hooks */
import { useLoader } from 'shared/hooks';
import { useAdminNotify } from 'admin/core';
/* services */
import { productDetailService } from 'admin/collections/services';
/* assets */
import { MdDangerous } from 'react-icons/md';

export const useProductDetail = () => {
    /* states */
    const { productId } = useParams<{ productId: string }>();

    const [product, setProduct] = useState<{} | null>(null);

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

    /* reactivity */
    useEffect(() => {
        getProductDetail();
    }, [getProductDetail]);

    /* props */

    /* context */
    const context: ProductDetailContextProps = {};

    return { context };
};
