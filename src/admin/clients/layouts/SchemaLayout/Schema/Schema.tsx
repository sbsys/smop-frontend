/* react */
import { memo } from 'react';
import { Outlet } from 'react-router-dom';
/* layouts */
import { PanelLayout } from 'shared/layouts';
/* components */
import { Appbar } from '../Appbar';
/* styles */
import styles from './Schema.module.scss';

const Schema = () => {
    return (
        <PanelLayout className={styles.Schema} orientation="col">
            <Appbar />

            <PanelLayout className={styles.Content}>
                <Outlet />
            </PanelLayout>
        </PanelLayout>
    );
};

export default memo(Schema);
