/* react */
import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
/* props */
import { SchemaLayoutContextProps } from './SchemaLayout.props';
/* store */
import { clientsStoreSetOrganization } from 'admin/clients/store';
/* hooks */
import { useLoader } from 'shared/hooks';
import { useAdminNotify, useClientsDispatch } from 'admin/core';
/* services */
import { getOrgPublisherDetailService } from 'admin/clients/services';
/* assets */
import { MdDangerous } from 'react-icons/md';

export const useSchemaLayout = () => {
    /* states */
    const { schema } = useParams<{ schema: string }>();

    const { notify } = useAdminNotify();

    const { showLoader, hideLoader } = useLoader();

    const dispatch = useClientsDispatch();

    /* functions */
    const getOrgPublisherDetail = useCallback(async () => {
        showLoader();

        const service = await getOrgPublisherDetailService(schema ?? '');

        hideLoader();

        if (service.error)
            return notify('danger', {
                title: 'Error',
                icon: <MdDangerous />,
                text: service.message,
                timestamp: new Date(),
            });

        dispatch(clientsStoreSetOrganization(service.data));
    }, [dispatch, hideLoader, notify, schema, showLoader]);

    /* reactivity */
    useEffect(() => {
        getOrgPublisherDetail();
    }, [getOrgPublisherDetail]);

    /* context */
    const context: SchemaLayoutContextProps = {};

    return { context };
};
