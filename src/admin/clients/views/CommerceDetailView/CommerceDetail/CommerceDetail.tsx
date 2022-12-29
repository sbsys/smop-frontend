/* react */
import { memo } from 'react';
import { useOutlet } from 'react-router-dom';
/* context */
import { useCommerceDetailContext } from '../CommerceDetail.context';
/* layouts */
import { PanelLayout } from 'shared/layouts';
/* components */
import { CommerceTopMenu } from '../CommerceTopMenu';
import { CommerceSideMenu } from '../CommerceSideMenu';
import { CommerceInfo } from '../CommerceInfo';
/* styles */
import styles from './CommerceDetail.module.scss';

const CommerceDetail = () => {
    const {
        /* states */
        isCommerce,
    } = useCommerceDetailContext();

    const outlet = useOutlet();

    if (!isCommerce) return <div>No commerce</div>;

    return (
        <PanelLayout orientation="col" className={styles.CommerceDetail}>
            <div className={styles.Header}>
                <CommerceTopMenu />
            </div>

            <PanelLayout className={styles.Content}>
                <div className={styles.Menu}>
                    <CommerceSideMenu />
                </div>

                <PanelLayout orientation="col">{outlet === null ? <CommerceInfo /> : outlet}</PanelLayout>

                <div className={styles.Cart}>Shopping Cart</div>
            </PanelLayout>
        </PanelLayout>
    );
};

export default memo(CommerceDetail);
