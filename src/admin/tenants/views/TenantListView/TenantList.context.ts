/* react */
import { createContext } from 'react';
/* props */
import { TenantListContextProps } from './TenantList.props';

export const TenantListContext = createContext<TenantListContextProps>({
    /* props */
    textSearchProps: { field: {} },
    startDateSearchProps: { field: {} },
    endDateSearchProps: { field: {} },
    fromBusinessSearchProps: { field: {} },
    toBusinessSearchProps: { field: {} },
    stateSearchProps: { field: {} },
});
