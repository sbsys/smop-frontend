/* react */
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
/* hooks */
import { useLoader } from 'shared/hooks';
import { useAdminNotify } from 'admin/core';
/* props */
import { CommerceManagementContextProps } from './CommerceManagement.props';
/* services */
import { propsStoreService } from 'admin/linked/services';
/* types */
import { LinkedCommerceSettingsDTO } from 'admin/linked/types';
/* assets */
import { MdDangerous } from 'react-icons/md';

export const useCommerceManagement = () => {
    /* states */
    const { commerceId } = useParams<{ commerceId: string }>();

    const [linkedCommerceSettings, setLinkedCommerceSettings] = useState<LinkedCommerceSettingsDTO | null>(null);

    const { showLoader, hideLoader } = useLoader();

    const { notify } = useAdminNotify();

    /* functions */
    const getLinkedCommerceSettings = useCallback(async () => {
        if (linkedCommerceSettings !== null) return;

        showLoader();

        const service = await propsStoreService();

        hideLoader();

        if (service.error)
            return notify('danger', {
                title: 'Error',
                icon: <MdDangerous />,
                text: service.message,
                timestamp: new Date(),
            });

        /* add validation when link to 2 or more commerces */
        setLinkedCommerceSettings({ ...service.data, commerceId: commerceId ?? service.data.commerceId });
    }, [commerceId, hideLoader, linkedCommerceSettings, notify, showLoader]);

    /* reactivity */
    useEffect(() => {
        getLinkedCommerceSettings();
    }, [getLinkedCommerceSettings]);

    /* props */

    /* context */
    const context: CommerceManagementContextProps = {
        /* states */
        linkedCommerceSettings,
        /* functions */
        getLinkedCommerceSettings,
    };

    return { context };
};
