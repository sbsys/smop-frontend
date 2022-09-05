/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* context */
import { useTenantListContext } from '../TenantList.context';
/* layouts */
import { DropLayout, PanelLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { TenantListFilter } from '../TenantListFilter';
import { NewTenantAction, TenantListItem } from '../TenantList';
/* assets */
import { MdClose, MdFilterList } from 'react-icons/md';
/* styles */
import styles from './TenantListMobile.module.scss';

const TenantListMobile = () => {
    const {
        /* state */
        isDropFilter,
        showDropFilter,
        hideDropFilter,
        isBreakPoint,
        tenantList,
    } = useTenantListContext();

    const { t } = useTranslation();

    return (
        <PanelLayout className={styles.TenantList}>
            <div className={styles.Header}>
                <h1 title={t('views.tenants.header.title')}>
                    <Legend hasDots>{t('views.tenants.header.title')}</Legend>
                </h1>

                <DropLayout
                    isDrop={isDropFilter && !isBreakPoint}
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
                    {tenantList.map((tenant, index) => (
                        <li key={index}>
                            <TenantListItem {...tenant} />
                        </li>
                    ))}
                </ul>
            </ScrollLayout>
        </PanelLayout>
    );
};

export default memo(TenantListMobile);
