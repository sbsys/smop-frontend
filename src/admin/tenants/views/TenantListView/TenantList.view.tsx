/* react */
import { memo } from 'react';
import { useOutlet } from 'react-router-dom';
/* context */
import { TenantListProvider } from './TenantList.context';
/* custom hook */
import { useTenantList } from './useTenantList.hook';
/* layouts */
import { ModalLayout, PanelLayout } from 'shared/layouts';
/* components */
import { TenantListMobile } from './TenantListMobile';
import { TenantListDesktop } from './TenantListDesktop';
/* styles */
import styles from './TenantList.module.scss';

const TenantListView = () => {
    const { context } = useTenantList();

    const outlet = useOutlet();

    return (
        <TenantListProvider context={context}>
            <TenantListMobile />

            <TenantListDesktop />

            <ModalLayout isVisible={outlet !== null} rowAlignment="center" colAlignment="center" hasIndentation>
                <PanelLayout className={styles.RouteModal}>{outlet}</PanelLayout>
            </ModalLayout>
        </TenantListProvider>
    );
};

export default memo(TenantListView);
