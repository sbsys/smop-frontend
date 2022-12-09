/* react */
import { memo } from 'react';
/* custom hook */
import { useCommerceList } from './useCommerceList.hook';
/* context */
import { CommerceListProvider } from './CommerceList.context';
/* components */
import { CommerceList } from './CommerceList';

const CommerceListView = () => {
    const { context } = useCommerceList();

    return (
        <CommerceListProvider context={context}>
            <CommerceList />
        </CommerceListProvider>
    );
};

export default memo(CommerceListView);
