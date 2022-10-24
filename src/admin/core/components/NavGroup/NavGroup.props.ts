/* props */
import { DropNavItemProps } from './DropNavItem';
import { NavItemProps } from './NavItem';

export interface NavGroupProps {
    title: string;
    items: (NavItemProps | DropNavItemProps)[];
}
