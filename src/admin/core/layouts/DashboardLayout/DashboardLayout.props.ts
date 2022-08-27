/* props */
import { ButtonProps } from 'shared/components';
import { NavGroupProps } from 'admin/core/components';

export interface DashboardLayoutContextProps {
    /* states */
    title: string;
    isSidebar: boolean;
    isUnderBreakPoint: boolean;
    /* props */
    backProps: ButtonProps;
    menuProps: ButtonProps;
    groups: NavGroupProps[];
}
