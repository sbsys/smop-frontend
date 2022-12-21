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
import { MdStore } from 'react-icons/md';
/* styles */
import styles from './CommerceSideMenu.module.scss';

const CommerceSideMenu = () => {
    const {
        /* states */
        commerce: { referenceName, menu },
    } = useCommerceDetailContext();

    const hasMenu = useMemo(() => menu.length > 0, [menu.length]);

    const { lang, translate } = useClientsLang();

    return (
        <PanelLayout orientation="col" className={styles.CommerceSideMenu}>
            <NavLink
                to=""
                title={referenceName}
                end={true}
                className={({ isActive }) => classNames(styles.MenuLink, isActive && styles.MenuLinkActive)}>
                <i>
                    <MdStore />
                </i>

                <Legend hasDots>{referenceName}</Legend>
            </NavLink>

            <Legend hasDots justify="center" title={translate('commons.menu')}>
                {translate('commons.menu')}
            </Legend>

            {hasMenu ? (
                <ScrollLayout orientation="col">
                    <ul className={styles.MenuList}>
                        {menu.map((item, index) => (
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
                                    <img src={item.url} alt={item.defaultTitle} crossOrigin="anonymous" />

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

export default memo(CommerceSideMenu);
