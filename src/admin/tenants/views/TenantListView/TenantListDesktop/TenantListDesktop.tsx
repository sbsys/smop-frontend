/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* context */
import { useTenantListContext } from '../TenantList.context';
/* layouts */
import { PanelLayout } from 'shared/layouts';
/* components */
import { Legend } from 'shared/components';
import { TenantListFilter } from '../TenantListFilter';
import { TenantList } from '../TenantList';
/* styles */
import styles from './TenantListDesktop.module.scss';

const TenantListDesktop = () => {
    const {
        /* states */
        isBreakPoint,
    } = useTenantListContext();

    const { t } = useTranslation();

    return (
        <PanelLayout className={styles.TenantList}>
            <h1 title={t('views.tenants.header.title')}>
                <Legend hasDots>{t('views.tenants.header.title')}</Legend>
            </h1>

            {isBreakPoint && (
                <section className={styles.Filter}>
                    <TenantListFilter />
                </section>
            )}

            <PanelLayout orientation="row" className={styles.Container}>
                <section className={styles.List}>
                    <TenantList />
                </section>
            </PanelLayout>
        </PanelLayout>
    );
};

export default memo(TenantListDesktop);
