/* react */
import { memo } from 'react';
/* customm hook */
import { useCreateMainTitle } from './useCreateMainTitle.hook';
/* context */
import { CreateMainTitleProvider } from './CreateMainTitle.context';
/* components */
import { CreateMainTitle } from './CreateMainTitle';

const CreateMainTitleView = () => {
    const { context } = useCreateMainTitle();

    return (
        <CreateMainTitleProvider context={context}>
            <CreateMainTitle />
        </CreateMainTitleProvider>
    );
};

export default memo(CreateMainTitleView);
