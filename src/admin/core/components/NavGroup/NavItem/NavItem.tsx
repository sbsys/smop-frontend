/* react */
import { FC, memo } from 'react';
import { NavLink } from 'react-router-dom';
/* props */
import { NavItemProps } from './NavItem.props';
/* components */
import { Legend } from 'shared/components';
/* utils */
import { classNames } from 'shared/utils';
/* styles */
import styles from './NavItem.module.scss';

const NavItem: FC<NavItemProps> = ({ to, icon, text, isDisabled = false, ...rest }) => {
    return (
        <NavLink
            className={({ isActive }) => classNames(styles.NavItem, (isDisabled || isActive) && styles.NavItemActive)}
            to={to}
            title={text}
            {...rest}>
            <i>{typeof icon === 'function' ? icon() : icon}</i>

            <Legend hasDots>{text}</Legend>
        </NavLink>
    );
};

export default memo(NavItem);
