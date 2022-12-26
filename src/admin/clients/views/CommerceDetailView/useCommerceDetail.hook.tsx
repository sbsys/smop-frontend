/* react */
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
/* props */
import { CommerceDetailContextProps } from './CommerceDetail.props';
/* store */
import {
    clientsStoreCleanUpSelectedCommerce,
    clientsStoreSetCurrentCommerce,
    selectCurrentCommerce,
    selectOrganization,
} from 'admin/clients/store';
/* hooks */
import { useLoader } from 'shared/hooks';
import { useClientsDispatch, useClientsNotify, useClientsSelector } from 'admin/core';
/* services */
import { getCommerceDetailService } from 'admin/clients/services';
/* assets */
import { MdDangerous } from 'react-icons/md';

export const useCommerceDetail = () => {
    /* states */
    const org = useClientsSelector(selectOrganization);

    const { commerceId } = useParams<{ commerceId: string }>();

    const [isCommerce, setIsCommerce] = useState<boolean>(false);

    const commerce = useClientsSelector(selectCurrentCommerce);

    const { notify } = useClientsNotify();

    const { showLoader, hideLoader } = useLoader();

    const dispatch = useClientsDispatch();

    /* functions */
    const getCommerceDetail = useCallback(async () => {
        showLoader();

        const service = await getCommerceDetailService(org?.schema ?? '', commerceId ?? '');

        hideLoader();

        if (service.error)
            return notify('danger', {
                title: 'Error',
                icon: <MdDangerous />,
                text: service.message,
                timestamp: new Date(),
            });

        dispatch(clientsStoreSetCurrentCommerce(service.data));

        setIsCommerce(true);
    }, [commerceId, dispatch, hideLoader, notify, org?.schema, showLoader]);

    /* reactivity */
    useEffect(() => {
        getCommerceDetail();

        return () => {
            dispatch(clientsStoreCleanUpSelectedCommerce());
        };
    }, [dispatch, getCommerceDetail]);

    /* context */
    const context: CommerceDetailContextProps = {
        /* states */
        isCommerce,
        commerce,
    };

    return { context };
};
