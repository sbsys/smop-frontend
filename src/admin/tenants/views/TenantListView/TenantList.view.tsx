/* react */
import { memo } from 'react';
/* context */
import { TenantListProvider } from './TenantList.context';
/* custom hook */
import { useTenantList } from './useTenantList.hook';
/* components */
import { TenantListMobile } from './TenantListMobile';
import { TenantListDesktop } from './TenantListDesktop';

const TenantListView = () => {
    const { context } = useTenantList();

    return (
        <TenantListProvider context={context}>
            <TenantListMobile />

            <TenantListDesktop />
        </TenantListProvider>
    );
};

export default memo(TenantListView);
