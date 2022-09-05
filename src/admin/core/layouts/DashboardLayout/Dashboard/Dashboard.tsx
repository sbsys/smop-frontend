/* react */
import { memo } from 'react';
import { Outlet } from 'react-router-dom';
/* context */
import { useDashboardContext } from '../DashboardLayout.context';
/* layouts */
import { ModalLayout, PanelLayout } from 'shared/layouts';
/* components */
import { DashboardAppbar } from '../DashboardAppbar';
import { DashboardSidebar } from '../DashboardSidebar';
/* styles */
import styles from './Dashboard.module.scss';

const Dashboard = () => {
    const {
        /* states */
        isSidebar,
        isUnderBreakPoint,
    } = useDashboardContext();

    return (
        <PanelLayout className={styles.Dashboard}>
            {isSidebar && !isUnderBreakPoint && <DashboardSidebar />}

            <PanelLayout className={styles.Wrapper} orientation="col">
                <DashboardAppbar />

                <PanelLayout className={styles.Content} orientation="col">
                    <Outlet />
                </PanelLayout>
            </PanelLayout>

            <ModalLayout
                isVisible={isSidebar && isUnderBreakPoint}
                colAlignment="start"
                rowAlignment="center"
                className={styles.Drawer}>
                <DashboardSidebar />
            </ModalLayout>
        </PanelLayout>
    );
};

export default memo(Dashboard);
