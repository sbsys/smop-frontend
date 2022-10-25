/* react */
import { createContext, FC, useContext } from 'react';
/* props */
import { AddonsTitleListContextProps, AddonsTitleListProviderProps } from './AddonsTitleList.props';

const Context = createContext<AddonsTitleListContextProps>({
    /* states */
    addonsTitleList: [],
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

export const AddonsTitleListProvider: FC<AddonsTitleListProviderProps> = ({ context, children }) => {
    return (
        <Context.Provider value={context}>{typeof children === 'function' ? children() : children}</Context.Provider>
    );
};

export const useAddonsTitleListContext = () => useContext(Context);
