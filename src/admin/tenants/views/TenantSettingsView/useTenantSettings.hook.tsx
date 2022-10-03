/* react */
import { useCallback, useEffect, useState } from 'react';
/* store */
/* props */
import { TenantSettingsContextProps } from './TenantSettings.props';
/* hooks */
import { useActive, useLoader } from 'shared/hooks';
import { useAdminNotify } from 'admin/core';
/* services */
import { getOrganizationSettingsService } from 'admin/tenants/services';
/* types */
import { OrganizationSettingsDTO } from 'admin/tenants/types';
/* assets */
import { MdCheckCircle, MdDangerous } from 'react-icons/md';

export const useTenantSettings = () => {
    /* states */
    const [settings, setSettings] = useState<OrganizationSettingsDTO>({});

    const [isUpdateReference, showUpdateReference, hideUpdateReference] = useActive();
    const [isUpdateSettings, showUpdateSettings, hideUpdateSettings] = useActive();
    const [isUpdateBranding, showUpdateBranding, hideUpdateBranding] = useActive();

    const { showLoader, hideLoader } = useLoader();

    const { notify } = useAdminNotify();

    /* functions */
    const getOrganizationSettings = useCallback(async () => {
        showLoader();

        const service = await getOrganizationSettingsService();

        hideLoader();

        if (service.error)
            return notify('danger', {
                title: 'Error',
                icon: <MdDangerous />,
                text: service.message,
                timestamp: new Date(),
            });

        notify('success', {
            title: 'Success',
            icon: <MdCheckCircle />,
            text: service.message,
            timestamp: new Date(),
        });

        setSettings(service.data);
    }, [hideLoader, notify, showLoader]);

    /* reactivity */
    useEffect(() => {
        getOrganizationSettings();
    }, [getOrganizationSettings]);

    /* props */

    /* context */
    const context: TenantSettingsContextProps = {
        /* states */
        settings,
        isUpdateReference,
        showUpdateReference,
        hideUpdateReference,
        isUpdateSettings,
        showUpdateSettings,
        hideUpdateSettings,
        isUpdateBranding,
        showUpdateBranding,
        hideUpdateBranding,
        /* props */
    };

    return { context };
};
