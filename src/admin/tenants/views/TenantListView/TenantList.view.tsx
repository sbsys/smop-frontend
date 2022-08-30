/* react */
import { memo } from 'react';
/* context */
import { TenantListContext } from './TenantList.context';
/* custom hook */
import { useTenantList } from './useTenantList.hook';
/* components */
import { TenantListMobile } from './TenantListMobile';
import { TenantListDesktop } from './TenantListDesktop';

const TenantListView = () => {
    const { context } = useTenantList();

    return (
        <TenantListContext.Provider value={context}>
            <TenantListMobile />

            <TenantListDesktop />
        </TenantListContext.Provider>
    );
};

export default memo(TenantListView);
