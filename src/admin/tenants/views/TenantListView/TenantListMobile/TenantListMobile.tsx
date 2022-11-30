/* react */
import { memo } from 'react';
/* context */
import { useTenantListContext } from '../TenantList.context';
/* layouts */
import { DropLayout, PanelLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { TenantListFilter } from '../TenantListFilter';
import { NewTenantAction, TenantListItem } from '../TenantList';
/* hooks */
import { useAdminLang } from 'admin/core';
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

    const { translate } = useAdminLang();

    return (
        <PanelLayout className={styles.TenantList}>
            <div className={styles.Header}>
                <h1 title={translate('organizations.title')}>
                    <Legend hasDots>{translate('organizations.title')}</Legend>
                </h1>

                <DropLayout
                    isDrop={isDropFilter && !isBreakPoint}
                    dropCol="start"
                    dropRow="end"
                    anchorCol="start"
                    anchorRow="end"
                    drop={
                        <PanelLayout className={styles.FilterContent} orientation="col">
                            <Button onClick={hideDropFilter} title={translate('actions.close')}>
                                <i>
                                    <MdClose />
                                </i>
                            </Button>

                            <TenantListFilter />
                        </PanelLayout>
                    }>
                    <Button className={styles.Filter} onClick={showDropFilter} title={translate('actions.open')}>
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
