/* react */
import { memo } from 'react';
/* custom hook */
import { useUpdateLinkedTitle } from './useUpdateLinkedTitle.hook';
/* context */
import { UpdateLinkedTitleProvider } from './UpdateLinkedTitle.context';
/* components */
import { UpdateLinkedTitle } from './UpdateLinkedTitle';

const UpdateLinkedTitleView = () => {
    const { context } = useUpdateLinkedTitle();

    return (
        <UpdateLinkedTitleProvider context={context}>
            <UpdateLinkedTitle />
        </UpdateLinkedTitleProvider>
    );
};

export default memo(UpdateLinkedTitleView);
