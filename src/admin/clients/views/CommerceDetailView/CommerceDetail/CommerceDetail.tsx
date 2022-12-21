/* react */
import { memo } from 'react';
/* context */
import { useCommerceDetailContext } from '../CommerceDetail.context';
/* layouts */
import { PanelLayout } from 'shared/layouts';
/* components */
import { CommerceSideMenu } from '../CommerceSideMenu';
/* styles */
import styles from './CommerceDetail.module.scss';

const CommerceDetail = () => {
    const {
        /* states */
        isCommerce,
    } = useCommerceDetailContext();

    if (!isCommerce) return <div>No commerce</div>;

    return (
        <PanelLayout orientation="col" className={styles.CommerceDetail}>
            <div className={styles.Header}>
                <PanelLayout orientation="row" className={styles.Menu}>
                    Menu mobile
                </PanelLayout>

                <div className={styles.Cart}>Cart</div>
            </div>

            <PanelLayout className={styles.Content}>
                <div className={styles.Menu}>
                    <CommerceSideMenu />
                </div>

                <PanelLayout orientation="col" className={styles.Main}>
                    Children
                </PanelLayout>

                <div className={styles.Cart}>Shopping Cart</div>
            </PanelLayout>
        </PanelLayout>
    );
};

export default memo(CommerceDetail);
