/* react */
import { memo } from 'react';
import { Outlet, useOutlet } from 'react-router-dom';
/* layouts */
import { PanelLayout } from 'shared/layouts';
/* components */
import { Legend } from 'shared/components';
import { TenantListFilter } from '../TenantListFilter';
import { TenantList } from '../TenantList';
/* styles */
import styles from './TenantListDesktop.module.scss';

const TenantListDesktop = () => {
    const out = useOutlet();

    return (
        <PanelLayout className={styles.TenantList}>
            <h1>
                <Legend hasDots>Tenants</Legend>
            </h1>

            <section className={styles.Filter}>
                <TenantListFilter />
            </section>

            <PanelLayout orientation="row" className={styles.Container}>
                <section className={styles.List}>
                    <TenantList />
                </section>

                {out !== null && (
                    <section className={styles.Route}>
                        <Outlet />
                    </section>
                )}
            </PanelLayout>
        </PanelLayout>
    );
};

export default memo(TenantListDesktop);
