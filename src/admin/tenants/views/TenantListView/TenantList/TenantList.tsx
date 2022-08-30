/* react */
import { memo } from 'react';
/* layouts */
import { TableLayout } from 'shared/layouts';
/* components */
import { TenantListHeader } from './TenantListHeader';
import { TenantListRow } from './TenantListRow';
/* styles */
import styles from './TenantList.module.scss';

const TenantList = () => {
    return (
        <TableLayout
            className={styles.TenantList}
            header={TenantListHeader()}
            body={[...Array(20)].map(() => TenantListRow())}
        />
    );
};

export default memo(TenantList);
