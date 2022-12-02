/* react */
import { memo } from 'react';
/* layouts */
import { PanelLayout } from 'shared/layouts';
/* components */
import { CurrentMenu } from '../CurrentMenu';
import { Migrater } from '../Migrater';
/* styles */
import styles from './MenuMigrater.module.scss';

const MenuMigrater = () => {
    return (
        <PanelLayout className={styles.MenuMigrater}>
            <CurrentMenu />

            <Migrater />
        </PanelLayout>
    );
};

export default memo(MenuMigrater);
