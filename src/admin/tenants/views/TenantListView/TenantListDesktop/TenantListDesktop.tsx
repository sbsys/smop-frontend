/* react */
import { memo } from 'react';
/* context */
import { useTenantListContext } from '../TenantList.context';
/* layouts */
import { PanelLayout } from 'shared/layouts';
/* components */
import { Legend } from 'shared/components';
import { TenantListFilter } from '../TenantListFilter';
import { TenantList, NewTenantAction } from '../TenantList';
/* hooks */
import { useAdminLang } from 'admin/core';
/* styles */
import styles from './TenantListDesktop.module.scss';

const TenantListDesktop = () => {
    const {
        /* states */
        isBreakPoint,
    } = useTenantListContext();

    const { translate } = useAdminLang();

    return (
        <PanelLayout className={styles.TenantList}>
            <h1 title={translate('organizations.title')}>
                <Legend hasDots>{translate('organizations.title')}</Legend>
            </h1>

            {isBreakPoint && (
                <section className={styles.Filter}>
                    <TenantListFilter />
                </section>
            )}

            <span>
                <NewTenantAction />
            </span>

            <PanelLayout orientation="row" className={styles.Container}>
                <section className={styles.List}>
                    <TenantList />
                </section>
            </PanelLayout>
        </PanelLayout>
    );
};

export default memo(TenantListDesktop);
