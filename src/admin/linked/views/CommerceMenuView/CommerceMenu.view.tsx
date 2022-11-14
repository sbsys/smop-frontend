/* react */
import { memo } from 'react';
import { useOutlet } from 'react-router-dom';
/* custom hook */
import { useCommerceMenu } from './useCommerceMenu.hook';
/* context */
import { CommerceMenuProvider } from './CommerceMenu.context';
/* layouts */
import { ModalLayout, PanelLayout } from 'shared/layouts';
/* components */
import { CommerceMenuMobile } from './CommerceMenuMobile';
import { CommerceMenuDesktop } from './CommerceMenuDesktop';
import { CommerceMenuRemoveModal } from './CommerceMenuRemoveModal';
/* styles */
import styles from './CommerceMenu.module.scss'

const CommerceMenuView = () => {
    const { context } = useCommerceMenu();

    const outlet = useOutlet()

    return (
        <CommerceMenuProvider context={context}>
            <CommerceMenuMobile />

            <CommerceMenuDesktop />

            <CommerceMenuRemoveModal />

            <ModalLayout isVisible={outlet !== null} rowAlignment="center" colAlignment="center" hasIndentation>
                <PanelLayout className={styles.RouteModal} orientation="col">
                    {outlet}
                </PanelLayout>
            </ModalLayout>
        </CommerceMenuProvider>
    );
};

export default memo(CommerceMenuView);
