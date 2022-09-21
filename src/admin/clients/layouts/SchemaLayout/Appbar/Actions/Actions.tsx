/* react */
import { memo } from 'react';
/* layouts */
import { DropLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
/* styles */
import styles from './Actions.module.scss';

const Actions = () => {
    return (
        <DropLayout>
            <Button className={styles.Action}>
                <Legend hasDots>Guest</Legend>
            </Button>
        </DropLayout>
    );
};

export default memo(Actions);
