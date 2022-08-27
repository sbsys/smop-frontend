/* react */
import { memo } from 'react';
/* context */
import { TenantListContext } from './TenantList.context';
/* custom hook */
import { useTenantList } from './useTenantList.hook';
/* components */
import { TenantListDesktop } from './TenantListDesktop';

const TenantListView = () => {
    const { context } = useTenantList();

    return (
        <TenantListContext.Provider value={context}>
            <TenantListDesktop />
        </TenantListContext.Provider>
    );
};

export default memo(TenantListView);
