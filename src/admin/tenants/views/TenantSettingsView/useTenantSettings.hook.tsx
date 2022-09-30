/* props */
import { TenantSettingsContextProps } from './TenantSettings.props';
/* hooks */
import { useActive } from 'shared/hooks';

export const useTenantSettings = () => {
    /* states */
    const [isUpdateReference, showUpdateReference, hideUpdateReference] = useActive();
    const [isUpdateSettings, showUpdateSettings, hideUpdateSettings] = useActive();
    const [isUpdateBranding, showUpdateBranding, hideUpdateBranding] = useActive();

    /* props */

    /* context */
    const context: TenantSettingsContextProps = {
        /* states */
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
