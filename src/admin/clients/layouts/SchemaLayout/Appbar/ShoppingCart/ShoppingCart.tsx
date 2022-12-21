/* react */
import { memo } from 'react';
/* layouts */
import { DropLayout } from 'shared/layouts';
/* components */
import { Button } from 'shared/components';
/* assets */
import { MdShoppingCart } from 'react-icons/md';
/* styles */
import styles from './ShoppingCart.module.scss';

const ShoppingCart = () => {
    return (
        <DropLayout>
            <Button className={styles.ShoppingCart}>
                <i>
                    <MdShoppingCart />
                </i>

                <span className={styles.Badge}>+9</span>
            </Button>
        </DropLayout>
    );
};

export default memo(ShoppingCart);
