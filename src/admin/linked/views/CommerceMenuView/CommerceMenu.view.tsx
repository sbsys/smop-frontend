/* react */
import { memo } from 'react';
/* custom hook */
import { useCommerceMenu } from './useCommerceMenu.hook';
/* context */
import { CommerceMenuProvider } from './CommerceMenu.context';
/* components */
import { CommerceMenuMobile } from './CommerceMenuMobile';
import { CommerceMenuDesktop } from './CommerceMenuDesktop';

const CommerceMenuView = () => {
    const { context } = useCommerceMenu();

    return (
        <CommerceMenuProvider context={context}>
            <CommerceMenuMobile />

            <CommerceMenuDesktop />
        </CommerceMenuProvider>
    );
};

export default memo(CommerceMenuView);
