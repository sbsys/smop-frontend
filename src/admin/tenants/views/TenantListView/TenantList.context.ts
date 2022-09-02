/* react */
import { createContext } from 'react';
/* props */
import { TenantListContextProps } from './TenantList.props';

export const TenantListContext = createContext<TenantListContextProps>({
    /* states */
    tenantList: [],
    isInBreakPoint: false,
    /* functions */
    handleFilter: () => {},
    handleResetFilter: () => {},
    /* props */
    textSearchProps: { field: {} },
    startDateSearchProps: { field: {} },
    endDateSearchProps: { field: {} },
    stateSearchProps: { field: {} },
});
