/* react */
import { memo } from 'react';
import { Legend } from 'shared/components';
/* layouts */
import { PanelLayout } from 'shared/layouts';
/* components */
import { TenantListFilter } from '../TenantListFilter';
import { TenantList } from '../TenantList';
/* styles */
import styles from './TenantListDesktop.module.scss';

const TenantListDesktop = () => {
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

                {true && <section className={styles.Route}>Optional action</section>}
            </PanelLayout>
        </PanelLayout>
    );
};

export default memo(TenantListDesktop);
