/* react */
import { createContext, FC, useContext } from 'react';
/* props */
import { CommerceListContextProps, CommerceListProviderProps } from './CommerceList.props';
/* types */
import { OrganizationDetail } from 'admin/clients/types';

const Context = createContext<CommerceListContextProps>({
    /* states */
    organization: {} as OrganizationDetail,
    /* functions */
    handleSelectCommerce: () => () => {},
});

export const CommerceListProvider: FC<CommerceListProviderProps> = ({ children, context }) => {
    return (
        <Context.Provider value={context}>{typeof children === 'function' ? children() : children}</Context.Provider>
    );
};

export const useCommerceListContext = () => useContext(Context);
