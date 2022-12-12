/* react */
import { memo } from 'react';
/* components */
import { Legend } from 'shared/components';
/* utils */
import { classNames } from 'shared/utils';
/* styles */
import styles from './CommerceListItem.module.scss';

const CommerceListItem = () => {
    return (
        <div className={styles.ListItem}>
            <div className={styles.Header}>
                <h2>
                    <Legend hasDots>Lorem ipsum dolor sit amet consectetur.</Legend>
                </h2>

                <Legend hasDots className={classNames(styles.Title, styles.Online)} justify="center">
                    online
                </Legend>
            </div>

            <Legend justify="end" hasDots>
                Shipment <span className={styles.Title}>USD 8.95</span>
            </Legend>
        </div>
    );
};

export default memo(CommerceListItem);
