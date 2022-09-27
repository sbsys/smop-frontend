/* props */
import { TenantSettingsContextProps } from './TenantSettings.props';
/* hooks */
import { useActive } from 'shared/hooks';

export const useTenantSettings = () => {
    /* states */
    const [isUpdateBranding, showUpdateBranding, hideUpdateBranding] = useActive();

    /* props */

    /* context */
    const context: TenantSettingsContextProps = {
        /* states */
        isUpdateBranding,
        showUpdateBranding,
        hideUpdateBranding,
        /* props */
    };

    return { context };
};
