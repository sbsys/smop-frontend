/* react */
import { memo } from 'react';
/* custom hook */
import { useTenantApiManagement } from './useTenantApiManagement.hook';
/* context */
import { TenantApiManagementProvider } from './TenantApiManagement.context';
/* components */
import { TenantApiManagementMobile } from './TenantApiManagementMobile';
import { TenantApiManagementDesktop } from './TenantApiManagementDesktop';

const TenantApiManagementView = () => {
    const { context } = useTenantApiManagement();

    return (
        <TenantApiManagementProvider context={context}>
            <TenantApiManagementMobile />

            <TenantApiManagementDesktop />
        </TenantApiManagementProvider>
    );
};

export default memo(TenantApiManagementView);
