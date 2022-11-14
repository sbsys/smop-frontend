import { createContext, FC, useContext } from 'react';
import { CommerceMenuContextProps, CommerceMenuProviderProps } from './CommerceMenu.props';

const Context = createContext<CommerceMenuContextProps>({
    /* states */
    linkedTitleList: [],
    selectedTitleToRemove: null,
    isDropFilter: false,
    showDropFilter: () => {},
    hideDropFilter: () => {},
    isBreakPoint: false,
    /* functions */
    getMenuLinkedList: () => new Promise(resolve => resolve()),
    handleFilter: () => new Promise(resolve => resolve()),
    handleResetFilter: () => {},
    handleSelectTitleToRemove: _ => {},
    handleUnselectTitleToRemove: () => {},
    /* props */
    filterFormFields: [],
});

export const CommerceMenuProvider: FC<CommerceMenuProviderProps> = ({ context, children }) => {
    return (
        <Context.Provider value={context}>{typeof children === 'function' ? children() : children}</Context.Provider>
    );
};

export const useCommerceMenuContext = () => useContext(Context);
