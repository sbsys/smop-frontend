/* react */
import { useCallback, useEffect, useState } from 'react';
/* context */
import { useMainTitleListContext } from '../MainTitleList.context';
/* hooks */
import { useLoader } from 'shared/hooks';
import { useAdminNotify } from 'admin/core';
/* services */
import { mainTitleProductListService } from 'admin/collections/services';
/* types */
import { TitleProductListItemDTO } from 'admin/collections/types';
/* assets */
import { MdDangerous } from 'react-icons/md';

export const useMainTitle = () => {
    /* states */
    const {
        /* states */
        selectedTitle,
    } = useMainTitleListContext();

    const [productList, setProductList] = useState<TitleProductListItemDTO[]>([]);

    const { showLoader, hideLoader } = useLoader();

    const { notify } = useAdminNotify();

    /* functions */
    const getTitleProductList = useCallback(async () => {
        showLoader();

        const service = await mainTitleProductListService(selectedTitle?.titleId ?? 0);

        hideLoader();

        if (service.error)
            return notify('danger', {
                title: 'Error',
                icon: <MdDangerous />,
                text: service.message,
                timestamp: new Date(),
            });

        setProductList(service.data);
    }, [hideLoader, notify, selectedTitle?.titleId, showLoader]);

    /* reactivity */
    useEffect(() => {
        if (selectedTitle !== null) getTitleProductList();
        else setProductList([]);
    }, [getTitleProductList, selectedTitle]);

    return { productList };
};
