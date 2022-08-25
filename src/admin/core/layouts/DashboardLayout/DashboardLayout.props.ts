/* props */
import { ButtonProps } from 'shared/components';
import { NavGroupProps } from 'admin/core/components';

export interface DashboardLayoutContextProps {
    /* states */
    title: string;
    /* props */
    backProps: ButtonProps;
    groups: NavGroupProps[];
}
