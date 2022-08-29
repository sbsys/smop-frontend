/* react */
import { memo, useContext } from 'react';
import { Outlet } from 'react-router-dom';
/* context */
import { Context } from '../DashboardLayout.context';
/* layouts */
import { PanelLayout } from 'shared/layouts';
/* components */
import { DashboardSidebar } from '../DashboardSidebar';
import { DashboardAppbar } from '../DashboardAppbar';
/* styles */
import styles from './DashboardDesktop.module.scss';

const DashboardDesktop = () => {
    const {
        /* states */
        isSidebar,
    } = useContext(Context);

    return (
        <PanelLayout className={styles.Dashboard}>
            {isSidebar && <DashboardSidebar />}

            <PanelLayout className={styles.Wrapper} orientation="col">
                <DashboardAppbar />

                <PanelLayout className={styles.Content} orientation="col">
                    <Outlet />
                </PanelLayout>
            </PanelLayout>
        </PanelLayout>
    );
};

export default memo(DashboardDesktop);
