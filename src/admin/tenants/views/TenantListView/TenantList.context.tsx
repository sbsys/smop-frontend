/* react */
import { createContext, FC, useContext } from 'react';
/* props */
import { TenantListContextProps, TenantListProviderProps } from './TenantList.props';

export const TenantListContext = createContext<TenantListContextProps>({
    /* states */
    tenantList: [],
    isInBreakPoint: false,
    /* functions */
    handleFilter: () => new Promise<void>(resolve => resolve()),
    handleResetFilter: () => {},
    /* props */
    textSearchProps: { field: {} },
    startDateSearchProps: { field: {} },
    endDateSearchProps: { field: {} },
    stateSearchProps: { field: {} },
});

export const TenantListProvider: FC<TenantListProviderProps> = ({ context, children }) => {
    return (
        <TenantListContext.Provider value={context}>
            {typeof children === 'function' ? children() : children}
        </TenantListContext.Provider>
    );
};

export const useTenantListContext = () => useContext(TenantListContext);
