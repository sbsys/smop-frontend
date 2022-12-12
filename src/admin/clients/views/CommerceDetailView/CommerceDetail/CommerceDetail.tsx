/* react */
import { memo } from 'react';
/* layouts */
import { PanelLayout } from 'shared/layouts';
/* styles */
import styles from './CommerceDetail.module.scss';

const CommerceDetail = () => {
    return (
        <PanelLayout orientation="col" className={styles.CommerceDetail}>
            <div className={styles.Header}>
                <PanelLayout orientation="row" className={styles.Menu}>
                    Menu mobile
                </PanelLayout>

                <div className={styles.Cart}>Cart</div>
            </div>

            <PanelLayout className={styles.Content}>
                <div className={styles.Menu}>Menu desktop</div>

                <PanelLayout orientation="col" className={styles.Main}>
                    Children
                </PanelLayout>

                <div className={styles.Cart}>Shopping Cart</div>
            </PanelLayout>
        </PanelLayout>
    );
};

export default memo(CommerceDetail);
