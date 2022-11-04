/* react */
import { createContext, FC, useContext } from 'react';
/* props */
import { CommerceListContextProps, CommerceListProviderProps } from './CommerceList.props';

const Context = createContext<CommerceListContextProps>({
    /* states */
    commerceList: [],
    selectedCommerceToUpdateState: null,
    isDropFilter: false,
    showDropFilter: () => {},
    hideDropFilter: () => {},
    isBreakPoint: false,
    /* functions */
    getCommerceList: () => new Promise(resolve => resolve()),
    handleFilter: () => new Promise(resolve => resolve),
    handleResetFilter: () => {},
    handleSelectCommerceToUpdateState: _ => {},
    handleUnselectCommerceToUpdateState: () => {},
    /* props */
    filterFormFields: [],
});

export const CommerceListProvider: FC<CommerceListProviderProps> = ({ context, children }) => {
    return (
        <Context.Provider value={context}>{typeof children === 'function' ? children() : children}</Context.Provider>
    );
};

export const useCommerceListContext = () => useContext(Context);
