import { FC, memo } from 'react';
/* custom hook */
import { useCommerceDetail } from './useCommerceDetail.hook';
/* context */
import { CommerceDetailProvider } from './CommerceDetail.context';
/* components */
import { CommerceDetail } from './CommerceDetail';

const CommerceDetailView: FC<{ isHeaderHide?: boolean }> = ({ isHeaderHide = false }) => {
    const { context } = useCommerceDetail();

    return (
        <CommerceDetailProvider context={context}>
            <CommerceDetail isHeaderHide={isHeaderHide} />
        </CommerceDetailProvider>
    );
};

export default memo(CommerceDetailView);
