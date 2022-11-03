/* react */
import { memo } from 'react';
import { useOutlet } from 'react-router-dom';
/* custom hook */
import { useAddonsTitleList } from './useAddonsTitleList.hook';
/* context */
import { AddonsTitleListProvider } from './AddonsTitleList.context';
/* layouts */
import { ModalLayout, PanelLayout } from 'shared/layouts';
/* components */
import { AddonsTitleListMobile } from './AddonsTitleListMobile';
import { AddonsTitleListDesktop } from './AddonsTitleListDesktop';
import { UpdateAddonTitleModal } from './UpdateAddonTitleModal';
import { UpdateAddonTitleStateModal } from './UpdateAddonTitleStateModal';
import { AddonsTitleModal } from './AddonsTitleModal';
/* styles */
import styles from './AddonsTitleList.module.scss';

const AddonsTitleListView = () => {
    const { context } = useAddonsTitleList();

    const outlet = useOutlet();

    return (
        <AddonsTitleListProvider context={context}>
            <AddonsTitleListMobile />

            <AddonsTitleListDesktop />

            <UpdateAddonTitleModal />

            <UpdateAddonTitleStateModal />

            <AddonsTitleModal />

            <ModalLayout isVisible={outlet !== null} rowAlignment="center" colAlignment="center" hasIndentation>
                <PanelLayout className={styles.RouteModal} orientation="col">
                    {outlet}
                </PanelLayout>
            </ModalLayout>
        </AddonsTitleListProvider>
    );
};

export default memo(AddonsTitleListView);
