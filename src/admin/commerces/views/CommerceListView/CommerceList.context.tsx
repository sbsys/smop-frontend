/* react */
import { createContext, FC, useContext } from 'react';
/* props */
import { CommerceListContextProps, CommerceListProviderProps } from './CommerceList.props';

const Context = createContext<CommerceListContextProps>({
    /* states */
    commerceList: [],
    /* functions */
    handleFilter: () => new Promise(resolve => resolve),
    handleResetFilter: () => {},
    /* props */
    filterFormFields: [],
});

export const CommerceListProvider: FC<CommerceListProviderProps> = ({ context, children }) => {
    return (
        <Context.Provider value={context}>{typeof children === 'function' ? children() : children}</Context.Provider>
    );
};

export const useCommerceListContext = () => useContext(Context);
