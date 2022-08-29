/* react */
import { memo } from 'react';
import { Legend } from 'shared/components';
/* layouts */
import { PanelLayout } from 'shared/layouts';
/* components */
import { TenantListFilter } from '../TenantListFilter';
/* utils */
import { classNames } from 'shared/utils';
/* styles */
import { CardStyles } from 'shared/styles';
import styles from './TenantListDesktop.module.scss';

const TenantListDesktop = () => {
    return (
        <PanelLayout className={styles.TenantList}>
            <h1>
                <Legend hasDots>Tenants</Legend>
            </h1>

            <section className={classNames(CardStyles.Primary, styles.Filter)}>
                <TenantListFilter />
            </section>

            <PanelLayout orientation="row">
                <section>Tenants</section>

                <section>Optional action</section>
            </PanelLayout>
        </PanelLayout>
    );
};

export default memo(TenantListDesktop);
