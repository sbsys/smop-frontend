/* react */
import { createContext, FC, useContext } from 'react';
/* props */
import { CommerceListContextProps, CommerceListProviderProps } from './CommerceList.props';

const Context = createContext<CommerceListContextProps>({
    /* states */
    commerceList: [],
    isDropFilter: false,
    showDropFilter: () => {},
    hideDropFilter: () => {},
    isBreakPoint: false,
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
