/* react */
import { createContext } from 'react';
/* props */
import { TenantListContextProps } from './TenantList.props';

export const TenantListContext = createContext<TenantListContextProps>({
    /* states */
    isDropFilter: false,
    showDropFilter: () => {},
    hideDropFilter: () => {},
    isInBreakPoint: false,
    /* props */
    textSearchProps: { field: {} },
    startDateSearchProps: { field: {} },
    endDateSearchProps: { field: {} },
    stateSearchProps: { field: {} },
});
