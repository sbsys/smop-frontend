/* react */
import { ReactNode } from 'react';
/* props */
import { NavItemProps } from '../NavItem';

export interface DropNavItemProps {
    className?: string;
    icon: ReactNode | ReactNode[] | (() => ReactNode);
    text: string;
    items: NavItemProps[];
}
