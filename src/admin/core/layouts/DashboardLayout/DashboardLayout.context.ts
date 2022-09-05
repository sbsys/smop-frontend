/* react */
import { createContext, useContext } from 'react';
/* props */
import { DashboardLayoutContextProps } from './DashboardLayout.props';

export const Context = createContext<DashboardLayoutContextProps>({
    /* states */
    title: '',
    isSidebar: false,
    isUnderBreakPoint: false,
    /* functions */
    backProps: {},
    menuProps: {},
    /* props */
    groups: [],
});

export const useDashboardContext = () => useContext(Context);
