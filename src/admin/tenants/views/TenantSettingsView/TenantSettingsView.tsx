/* react */
import { memo } from 'react';
/* context */
import { TenantSettingsProvider } from './TenantSettings.context';
/* custom hook */
import { useTenantSettings } from './useTenantSettings.hook';
/* components */
import { TenantSettings } from './TenantSettings';

const TenantSettingsView = () => {
    const { context } = useTenantSettings();

    return (
        <TenantSettingsProvider context={context}>
            <TenantSettings />
        </TenantSettingsProvider>
    );
};

export default memo(TenantSettingsView);
