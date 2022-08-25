/* react */
import { memo } from 'react';
import { Outlet } from 'react-router-dom';
/* layouts */
import { PanelLayout } from 'shared/layouts';
/* components */
import { DashboardSidebar } from '../DashboardSidebar';
/* styles */
import styles from './DashboardDesktop.module.scss';

const DashboardDesktop = () => {
    return (
        <PanelLayout className={styles.Dashboard}>
            <DashboardSidebar />

            <PanelLayout orientation="col">
                <Outlet />
            </PanelLayout>
        </PanelLayout>
    );
};

export default memo(DashboardDesktop);
