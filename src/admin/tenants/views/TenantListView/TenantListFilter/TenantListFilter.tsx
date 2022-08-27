/* react */
import { memo } from 'react';
/* layouts */
import { PanelLayout } from 'shared/layouts';
/* styles */
import styles from './TenantListFilter.module.scss';

const TenantListFilter = () => {
    return <PanelLayout className={styles.Filter}>TenantListFilter</PanelLayout>;
};

export default memo(TenantListFilter);
