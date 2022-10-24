/* react */
import { FC, memo } from 'react';
/* props */
import { NavGroupProps } from './NavGroup.props';
/* components */
import { Legend } from 'shared/components';
import { NavItem, NavItemProps } from './NavItem';
import { DropNavItem, DropNavItemProps } from './DropNavItem';
/* utils */
import { classNames } from 'shared/utils';
/* styles */
import styles from './NavGroup.module.scss';

const NavGroup: FC<NavGroupProps> = ({ title, items }) => {
    return (
        <div className={classNames(styles.NavGroup)}>
            <Legend hasDots title={title}>
                {title}
            </Legend>

            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        {(item as DropNavItemProps).items !== undefined ? (
                            <DropNavItem {...(item as DropNavItemProps)} />
                        ) : (
                            <NavItem {...(item as NavItemProps)} />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default memo(NavGroup);
