/* react */
import { createContext, FC, useContext } from 'react';
/* props */
import { AddonsTitleListContextProps, AddonsTitleListProviderProps } from './AddonsTitleList.props';

const Context = createContext<AddonsTitleListContextProps>({
    /* states */
    addonsTitleList: [],
    selectedTitleToUpdate: null,
    selectedTitleToUpdateState: null,
    isDropFilter: false,
    showDropFilter: () => {},
    hideDropFilter: () => {},
    isBreakPoint: false,
    /* functions */
    handleFilter: () => new Promise(resolve => resolve),
    handleResetFilter: () => {},
    getTitleList: () => new Promise(resolve => resolve()),
    handleSelectTitleToUpdate: (id: number) => {},
    handleUnselectTitleToUpdate: () => {},
    handleSelectTitleToUpdateState: (id: number) => {},
    handleUnselectTitleToUpdateState: () => {},
    /* props */
    filterFormFields: [],
});

export const AddonsTitleListProvider: FC<AddonsTitleListProviderProps> = ({ context, children }) => {
    return (
        <Context.Provider value={context}>{typeof children === 'function' ? children() : children}</Context.Provider>
    );
};

export const useAddonsTitleListContext = () => useContext(Context);
