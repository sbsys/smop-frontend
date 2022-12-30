/* react */
import { createContext, FC, useContext } from 'react';
/* props */
import { TenantApiManagementContextProps, TenantApiManagementProviderProps } from './TenantApiManagement.props';

const Context = createContext<TenantApiManagementContextProps>({
    /* states */
    keyList: [],
    isDropFilter: false,
    showDropFilter: () => {},
    hideDropFilter: () => {},
    isBreakPoint: false,
    /* functions */
    handleFilter: () => new Promise(resolve => resolve()),
    handleResetFilter: () => {},
    getKeyList: () => new Promise(resolve => resolve()),
    /* props */
    filterFormFields: [],
});

export const TenantApiManagementProvider: FC<TenantApiManagementProviderProps> = ({ context, children }) => {
    return (
        <Context.Provider value={context}>{typeof children === 'function' ? children() : children}</Context.Provider>
    );
};

export const useTenantApiManagementContext = () => useContext(Context);
