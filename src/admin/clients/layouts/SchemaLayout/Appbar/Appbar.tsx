/* react */
import { memo } from 'react';
/* components */
import { ShoppingCart } from './ShoppingCart';
import { Actions } from './Actions';
/* assets */
/* styles */
import styles from './Appbar.module.scss';

const Appbar = () => {
    return (
        <div className={styles.Appbar}>
            <ShoppingCart />

            <Actions />
        </div>
    );
};

export default memo(Appbar);
