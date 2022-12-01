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
        <PanelLayout orientation="col" className={styles.MenuMigrater}>
            <section className={styles.Extended}>
                <CurrentMenu />
            </section>

            <section>
                <Migrater />
            </section>
        </PanelLayout>
    );
};

export default memo(MenuMigrater);
