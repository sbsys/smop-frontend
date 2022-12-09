/* react */
import { memo } from 'react';
/* components */
import { Legend } from 'shared/components';
/* styles */
import styles from './CommerceListItem.module.scss';

const CommerceListItem = () => {
    return (
        <div className={styles.ListItem}>
            <div className={styles.Header}>
                <h2>
                    <Legend hasDots>Lorem ipsum dolor sit amet consectetur.</Legend>
                </h2>

                <Legend hasDots className={styles.Title} justify="center">
                    online
                </Legend>
            </div>

            <Legend justify="end">
                Shipment <span className={styles.Title}>USD 8.95</span>
            </Legend>

            {/* <Legend>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, eveniet!</Legend>

            <ul>
                <li>+505-88776655</li>

                <li>+505-77665544</li>
            </ul> */}
        </div>
    );
};

export default memo(CommerceListItem);
