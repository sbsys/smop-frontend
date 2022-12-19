/* react */
import { useCallback, useEffect, useState } from 'react';
/* store */
/* props */
import { TenantSettingsContextProps } from './TenantSettings.props';
/* hooks */
import { useActive, useLoader } from 'shared/hooks';
import { useAdminNotify } from 'admin/core';
/* services */
import { getOrganizationLinkService, getOrganizationSettingsService } from 'admin/tenants/services';
/* utils */
import { copyToClipboard } from 'shared/utils';
/* types */
import { OrganizationSettingsDTO } from 'admin/tenants/types';
/* assets */
import { MdDangerous, MdInfo } from 'react-icons/md';

export const useTenantSettings = () => {
    /* states */
    const [settings, setSettings] = useState<OrganizationSettingsDTO | null>(null);
    const [orgLink, setOrgLink] = useState<string>('');

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

        setSettings(service.data);
    }, [hideLoader, notify, showLoader]);

    const getOrganizationLink = useCallback(async () => {
        showLoader();

        const service = await getOrganizationLinkService();

        hideLoader();

        if (service.error)
            return notify('danger', {
                title: 'Error',
                icon: <MdDangerous />,
                text: service.message,
                timestamp: new Date(),
            });

        setOrgLink(`${window.location.origin}/${service.data}`);
    }, [hideLoader, notify, showLoader]);

    const handleCopyToClipboard = useCallback(() => {
        copyToClipboard(orgLink);

        notify('info', {
            title: 'Copy',
            icon: <MdInfo />,
            text: orgLink,
            timestamp: new Date(),
        });
    }, [notify, orgLink]);

    /* reactivity */
    useEffect(() => {
        getOrganizationSettings();
    }, [getOrganizationSettings]);

    /* props */

    /* context */
    const context: TenantSettingsContextProps = {
        /* states */
        settings,
        orgLink,
        isUpdateReference,
        showUpdateReference,
        hideUpdateReference,
        isUpdateSettings,
        showUpdateSettings,
        hideUpdateSettings,
        isUpdateBranding,
        showUpdateBranding,
        hideUpdateBranding,
        /* functions */
        getOrganizationSettings,
        getOrganizationLink,
        handleCopyToClipboard,
        /* props */
    };

    return { context };
};
