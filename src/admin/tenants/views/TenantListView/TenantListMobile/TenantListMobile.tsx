/* react */
import { memo /* useContext */ } from 'react';
import { Outlet, useOutlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
/* context */
//import { TenantListContext } from '../TenantList.context';
/* layouts */
import { DropLayout, PanelLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { TenantListFilter } from '../TenantListFilter';
import { NewTenantAction, TenantListItem } from '../TenantList';
/* hooks */
import { useActive, useKeyDownEvent } from 'shared/hooks';
/* assets */
import { MdClose, MdFilterList } from 'react-icons/md';
/* styles */
import styles from './TenantListMobile.module.scss';

const TenantListMobile = () => {
    //const {} = useContext(TenantListContext);

    const { t } = useTranslation();

    const out = useOutlet();

    const [isDropFilter, showDropFilter, hideDropFilter] = useActive();

    useKeyDownEvent(event => event.key === 'Escape' && hideDropFilter());

    return (
        <>
            {out === null ? (
                <PanelLayout className={styles.TenantList}>
                    <div className={styles.Header}>
                        <h1 title={t('views.tenants.header.title')}>
                            <Legend hasDots>{t('views.tenants.header.title')}</Legend>
                        </h1>

                        <DropLayout
                            isDrop={isDropFilter}
                            dropCol="start"
                            dropRow="end"
                            anchorCol="start"
                            anchorRow="end"
                            drop={
                                <PanelLayout className={styles.FilterContent} orientation="col">
                                    <Button onClick={hideDropFilter} title={t('views.tenants.header.closefilter')}>
                                        <i>
                                            <MdClose />
                                        </i>
                                    </Button>

                                    <TenantListFilter />
                                </PanelLayout>
                            }>
                            <Button
                                className={styles.Filter}
                                onClick={showDropFilter}
                                title={t('views.tenants.header.openfilter')}>
                                <i>
                                    <MdFilterList />
                                </i>
                            </Button>
                        </DropLayout>
                    </div>

                    <span>
                        <NewTenantAction />
                    </span>

                    <ScrollLayout classNameContent={styles.List} orientation="col">
                        <ul>
                            {[...Array(20)].map((_, index) => (
                                <li key={index}>
                                    <TenantListItem />
                                </li>
                            ))}
                        </ul>
                    </ScrollLayout>
                </PanelLayout>
            ) : (
                <Outlet />
            )}
        </>
    );
};

export default memo(TenantListMobile);
