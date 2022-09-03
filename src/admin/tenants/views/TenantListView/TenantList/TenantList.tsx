/* react */
import { memo } from 'react';
/* context */
import { useTenantListContext } from '../TenantList.context';
/* layouts */
import { TableLayout } from 'shared/layouts';
/* components */
import { TenantListHeader } from './TenantListHeader';
import { TenantListRow } from './TenantListRow';
/* styles */
import styles from './TenantList.module.scss';

const TenantList = () => {
    const {
        /* states */
        tenantList,
    } = useTenantListContext();

    return (
        <TableLayout
            className={styles.TenantList}
            header={TenantListHeader()}
            body={tenantList.map(tenant => TenantListRow(tenant))}
        />
    );
};

export default memo(TenantList);
