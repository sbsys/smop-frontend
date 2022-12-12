/* react */
import { memo } from 'react';
/* custom hook */
import { useCommerceDetail } from './useCommerceDetail.hook';
/* context */
import { CommerceDetailProvider } from './CommerceDetail.context';
/* components */
import { CommerceDetail } from './CommerceDetail';

const CommerceDetailView = () => {
    const { context } = useCommerceDetail();

    return (
        <CommerceDetailProvider context={context}>
            <CommerceDetail />
        </CommerceDetailProvider>
    );
};

export default memo(CommerceDetailView);
