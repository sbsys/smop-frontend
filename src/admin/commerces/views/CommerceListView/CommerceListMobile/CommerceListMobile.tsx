/* react */
import { memo } from 'react';
/* layouts */
import { PanelLayout } from 'shared/layouts';
/* styles */
import styles from './CommerceListMobile.module.scss';

const CommerceListMobile = () => {
    return <PanelLayout className={styles.CommerceList}>CommerceListMobile</PanelLayout>;
};

export default memo(CommerceListMobile);
