/* react */
import { memo, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
/* context */
import { useCommerceDetailContext } from '../CommerceDetail.context';
/* layouts */
import { PanelLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Legend } from 'shared/components';
/* hooks */
import { useClientsLang } from 'admin/core';
/* utils */
import { classNames } from 'shared/utils';
/* assets */
import { MdHome } from 'react-icons/md';
/* styles */
import styles from './CommerceTopMenu.module.scss';

const CommerceTopMenu = () => {
    const {
        /* states */
        commerce,
    } = useCommerceDetailContext();

    const hasMenu = useMemo(() => (commerce?.menu?.length ?? 0) > 0, [commerce?.menu?.length]);

    const { lang } = useClientsLang();

    return (
        <PanelLayout orientation="row" className={styles.CommerceTopMenu}>
            <NavLink
                to=""
                end
                title={commerce?.referenceName}
                className={({ isActive }) => classNames(styles.MenuLink, isActive && styles.MenuLinkActive)}>
                <i>
                    <MdHome />
                </i>
            </NavLink>

            {hasMenu ? (
                <ScrollLayout orientation="row">
                    <ul className={styles.MenuList}>
                        {commerce?.menu.map((item, index) => (
                            <li
                                key={index}
                                title={
                                    item.titleCollection.find(currentLang => currentLang.lang === lang)?.ref ??
                                    item.defaultTitle
                                }>
                                <NavLink
                                    to={`menu/${item.titleId}`}
                                    className={({ isActive }) =>
                                        classNames(styles.MenuLink, isActive && styles.MenuLinkActive)
                                    }>
                                    <Legend hasDots>
                                        {item.titleCollection.find(currentLang => currentLang.lang === lang)?.ref ??
                                            item.defaultTitle}
                                    </Legend>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </ScrollLayout>
            ) : (
                <div>No menu</div>
            )}
        </PanelLayout>
    );
};

export default memo(CommerceTopMenu);
