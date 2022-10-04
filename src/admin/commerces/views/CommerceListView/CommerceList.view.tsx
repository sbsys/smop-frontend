/* react */
import { memo } from 'react';
/* custom hook */
import { useCommerceList } from './useCommerceList.hook';
/* context */
import { CommerceListProvider } from './CommerceList.context';
/* components */
import { CommerceListMobile } from './CommerceListMobile';
import { CommerceListDesktop } from './CommerceListDesktop';

const CommerceListView = () => {
    const { context } = useCommerceList();

    return (
        <CommerceListProvider context={context}>
            <CommerceListMobile />

            <CommerceListDesktop />
        </CommerceListProvider>
    );
};

export default memo(CommerceListView);
