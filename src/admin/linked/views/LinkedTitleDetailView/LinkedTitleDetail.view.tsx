/* react */
import { memo } from 'react';
/* custom hook */
import { useLinkedTitleDetail } from './useLinkedTitleDetail.hook';
/* context */
import { LinkedTitleDetailProvider } from './LinkedTitleDetail.context';
/* components */
import { LinkedTitleDetail } from './LinkedTitleDetail';

const LinkedTitleDetailView = () => {
    const { context } = useLinkedTitleDetail();

    return (
        <LinkedTitleDetailProvider context={context}>
            <LinkedTitleDetail />
        </LinkedTitleDetailProvider>
    );
};

export default memo(LinkedTitleDetailView);
