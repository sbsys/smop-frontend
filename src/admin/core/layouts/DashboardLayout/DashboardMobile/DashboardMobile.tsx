/* react */
import { memo, useContext } from 'react';
import { Outlet } from 'react-router-dom';
/* context */
import { Context } from '../DashboardLayout.context';
/* layouts */
import { ModalLayout, PanelLayout } from 'shared/layouts';
/* components */
import { DashboardSidebar } from '../DashboardSidebar';
import { DashboardAppbar } from '../DashboardAppbar';
/* styles */
import styles from './DashboardMobile.module.scss';

const DashboardMobile = () => {
    const {
        /* states */
        isSidebar,
        isUnderBreakPoint,
    } = useContext(Context);

    return (
        <PanelLayout className={styles.Dashboard}>
            <DashboardAppbar />

            <PanelLayout className={styles.Content} orientation="col">
                <Outlet />
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

export default memo(DashboardMobile);
