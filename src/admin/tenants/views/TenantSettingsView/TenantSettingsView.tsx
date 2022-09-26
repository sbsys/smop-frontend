/* react */
import { memo } from 'react';
/* custom hook */
/* context */
/* components */
import { TenantSettings } from './TenantSettings';

const TenantSettingsView = () => {
    return (
        <>
            <TenantSettings />
        </>
    );
};

export default memo(TenantSettingsView);
