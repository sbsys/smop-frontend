/* react */
import { memo } from 'react';
/* custom hook */
import { useAddonsTitleList } from './useAddonsTitleList.hook';
/* context */
import { AddonsTitleListProvider } from './AddonsTitleList.context';
/* components */
import { AddonsTitleListMobile } from './AddonsTitleListMobile';
import { AddonsTitleListDesktop } from './AddonsTitleListDesktop';

const AddonsTitleListView = () => {
    const { context } = useAddonsTitleList();

    return (
        <AddonsTitleListProvider context={context}>
            <AddonsTitleListMobile />

            <AddonsTitleListDesktop />
        </AddonsTitleListProvider>
    );
};

export default memo(AddonsTitleListView);
