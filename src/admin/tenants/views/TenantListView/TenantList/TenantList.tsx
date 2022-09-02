/* react */
import { memo, useContext } from 'react';
/* context */
import { TenantListContext } from '../TenantList.context';
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
    } = useContext(TenantListContext);

    return (
        <TableLayout
            className={styles.TenantList}
            header={TenantListHeader()}
            body={tenantList.map(tenant => TenantListRow(tenant))}
        />
    );
};

export default memo(TenantList);
