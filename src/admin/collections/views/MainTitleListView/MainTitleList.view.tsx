/* react */
import { memo } from 'react';
import { useOutlet } from 'react-router-dom';
/* custom hook */
import { useMainTitleList } from './useMainTitleList.hook';
/* context */
import { MainTitleListProvider } from './MainTitleList.context';
/* layouts */
import { ModalLayout, PanelLayout } from 'shared/layouts';
/* components */
import { MainTitleListMobile } from './MainTitleListMobile';
import { MainTitleListDesktop } from './MainTitleListDesktop';
/* styles */
import styles from './MainTitleList.module.scss';

const MainTitleListView = () => {
    const { context } = useMainTitleList();

    const outlet = useOutlet();

    return (
        <MainTitleListProvider context={context}>
            <MainTitleListMobile />

            <MainTitleListDesktop />

            <ModalLayout isVisible={outlet !== null} rowAlignment="center" colAlignment="center" hasIndentation>
                <PanelLayout className={styles.RouteModal} orientation="col">
                    {outlet}
                </PanelLayout>
            </ModalLayout>
        </MainTitleListProvider>
    );
};

export default memo(MainTitleListView);
