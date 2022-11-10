import { createContext, FC, useContext } from 'react';
import { CommerceManagementContextProps, CommerceManagementProviderProps } from './CommerceManagement.props';

const Context = createContext<CommerceManagementContextProps>({
    /* states */
    /* functions */
    getLinkedCommerceSettings: () => new Promise(resolve => resolve()),
});

export const CommerceManagementProvider: FC<CommerceManagementProviderProps> = ({ context, children }) => {
    return (
        <Context.Provider value={context}>{typeof children === 'function' ? children() : children}</Context.Provider>
    );
};

export const useCommerceManagementContext = () => useContext(Context);
