/* react */
import { memo } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
/* context */
import { useCommerceManagementContext } from '../CommerceManagement.context';
/* layouts */
import { PanelLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Legend } from 'shared/components';
/* hooks */
import { useAdminLang } from 'admin/core';
/* utils */
import { classNames } from 'shared/utils';
/* styles */
import styles from './CommerceManagement.module.scss';

const CommerceManagement = () => {
    const {
        /* states */
        linkedCommerceSettings,
    } = useCommerceManagementContext();

    const { translate } = useAdminLang();

    return (
        <PanelLayout orientation="col" className={styles.CommerceManagement}>
            <h1 title={translate('linkedcommerce.title')}>
                <Legend hasDots>{translate('linkedcommerce.title')}</Legend>
            </h1>

            <section>
                <ScrollLayout orientation="row" classNameContent={styles.Links}>
                    <div>
                        <NavLink
                            to={linkedCommerceSettings?.commerceId ?? ''}
                            className={({ isActive }) => classNames(styles.Link, isActive && styles.LinkActive)}
                            title={translate('commercedetail.title')}>
                            <Legend hasDots justify="center">
                                {translate('commercedetail.title')}
                            </Legend>
                        </NavLink>

                        <NavLink
                            to={`menu`}
                            className={({ isActive }) => classNames(styles.Link, isActive && styles.LinkActive)}
                            title={translate('commercemenu.title')}>
                            <Legend hasDots justify="center">
                                {translate('commercemenu.title')}
                            </Legend>
                        </NavLink>
                    </div>
                </ScrollLayout>
            </section>

            <Outlet />
        </PanelLayout>
    );
};

export default memo(CommerceManagement);
