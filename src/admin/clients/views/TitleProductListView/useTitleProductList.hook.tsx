/* react */
import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
/* props */
import { TitleProductListContextProps } from './TitleProductList.props';
/* store */
import { clientsStoreSetMenuTitleProductList, selectCurrentTitle, selectOrganization } from 'admin/clients/store';
/* hooks */
import { useLoader } from 'shared/hooks';
import { useClientsDispatch, useClientsNotify, useClientsSelector } from 'admin/core';
/* services */
import { getTitleProductListService } from 'admin/clients/services';
/* assets */
import { MdDangerous } from 'react-icons/md';

export const useTitleProductList = () => {
    /* states */
    const org = useClientsSelector(selectOrganization);

    const { commerceId, titleId } = useParams<{ commerceId: string; titleId: string }>();

    const { menuTitle, productList } = useClientsSelector(selectCurrentTitle(Number.parseInt(titleId ?? '0')));

    const { notify } = useClientsNotify();

    const { showLoader, hideLoader } = useLoader();

    const dispatch = useClientsDispatch();

    /* functions */
    const getTitleProductList = useCallback(async () => {
        showLoader();

        const service = await getTitleProductListService(
            org?.schema ?? '',
            commerceId ?? '',
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

        dispatch(
            clientsStoreSetMenuTitleProductList({ titleId: Number.parseInt(titleId ?? '0'), productList: service.data })
        );
    }, [commerceId, dispatch, hideLoader, notify, org?.schema, showLoader, titleId]);

    /* reactivity */
    useEffect(() => {
        getTitleProductList();
    }, [getTitleProductList]);

    /* context */
    const context: TitleProductListContextProps = {
        /* states */
        menuTitle,
        productList,
    };

    return { context };
};
