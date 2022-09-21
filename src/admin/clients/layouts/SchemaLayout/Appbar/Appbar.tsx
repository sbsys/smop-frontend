/* react */
import { memo } from 'react';
/* layouts */
import { DropLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
/* styles */
import styles from './Appbar.module.scss';

const Appbar = () => {
    return (
        <div className={styles.Appbar}>
            <Button>
                <i>LOGO</i>
            </Button>

            <DropLayout>
                <Button>
                    <Legend hasDots>Guest</Legend>
                </Button>
            </DropLayout>
        </div>
    );
};

export default memo(Appbar);
