/* react */
import { memo, useContext } from 'react';
import { Outlet, useOutlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
/* context */
import { TenantListContext } from '../TenantList.context';
/* layouts */
import { ModalLayout, PanelLayout } from 'shared/layouts';
/* components */
import { Legend } from 'shared/components';
import { TenantListFilter } from '../TenantListFilter';
import { TenantList } from '../TenantList';
/* styles */
import styles from './TenantListDesktop.module.scss';

const TenantListDesktop = () => {
    const {
        /* states */
        isInBreakPoint,
    } = useContext(TenantListContext);

    const { t } = useTranslation();

    const out = useOutlet();

    return (
        <PanelLayout className={styles.TenantList}>
            <h1 title={t('views.tenants.header.title')}>
                <Legend hasDots>{t('views.tenants.header.title')}</Legend>
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

            <ModalLayout
                isVisible={out !== null && isInBreakPoint}
                rowAlignment="center"
                colAlignment="center"
                hasIndentation>
                <PanelLayout className={styles.RouteModal}>
                    <Outlet />
                </PanelLayout>
            </ModalLayout>
        </PanelLayout>
    );
};

export default memo(TenantListDesktop);
