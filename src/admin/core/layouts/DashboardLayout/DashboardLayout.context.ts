/* react */
import { createContext } from 'react';
/* props */
import { DashboardLayoutContextProps } from './DashboardLayout.props';

export const Context = createContext<DashboardLayoutContextProps>({
    /* states */
    title: '',
    /* functions */
    backProps: {},
    /* props */
    groups: [],
});
