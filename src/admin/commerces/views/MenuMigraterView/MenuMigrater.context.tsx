/* react */
import { createContext, FC, useContext } from 'react';
/* props */
import { MenuMigraterContextProps, MenuMigraterProviderProps } from './MenuMigrater.props';

const Context = createContext<MenuMigraterContextProps>({
    /* states */
    currentMenu: [],
    menuMerge: {
        commerces: [],
        menu: [],
    },
    isCurrentMenuTabOpen: false,
    isMigraterTabOpen: false,
    handleOpenCurrentMenuTab: () => {},
    handleOpenMigraterTab: () => {},
    isBreakPoint: false,
    isCommerceMigraterSelected: false,
    isGenericMigraterSelected: false,
    handleSelectCommerceMigrater: () => {},
    handleSelectGenericMigrater: () => {},
    handlePostUpdateMenu: () => {},
});

export const MenuMigraterProvider: FC<MenuMigraterProviderProps> = ({ context, children }) => {
    return (
        <Context.Provider value={context}>{typeof children === 'function' ? children() : children}</Context.Provider>
    );
};

export const useMenuMigraterContext = () => useContext(Context);
