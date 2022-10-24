/* react */
import { createContext, FC, useContext } from 'react';
/* props */
import { MainTitleListContextProps, MainTitleListProviderProps } from './MainTitleList.props';

const Context = createContext<MainTitleListContextProps>({
    /* states */
    mainTitleList: [],
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

export const MainTitleListProvider: FC<MainTitleListProviderProps> = ({ context, children }) => {
    return (
        <Context.Provider value={context}>{typeof children === 'function' ? children() : children}</Context.Provider>
    );
};

export const useMainTitleListContext = () => useContext(Context);
