/* react */
import { memo } from 'react';
/* components */
import { Button } from 'shared/components';
import { Actions } from './Actions';
/* styles */
import styles from './Appbar.module.scss';

const Appbar = () => {
    return (
        <div className={styles.Appbar}>
            <Button>
                <i>LOGO</i>
            </Button>

            <Actions />
        </div>
    );
};

export default memo(Appbar);
