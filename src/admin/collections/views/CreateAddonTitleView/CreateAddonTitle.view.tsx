/* react */
import { memo } from 'react';
/* customm hook */
import { useCreateAddonTitle } from './useCreateAddonTitle.hook';
/* context */
import { CreateAddonTitleProvider } from './CreateAddonTitle.context';
/* components */
import { CreateAddonTitle } from './CreateAddonTitle';

const CreateAddonTitleView = () => {
    const { context } = useCreateAddonTitle();

    return (
        <CreateAddonTitleProvider context={context}>
            <CreateAddonTitle />
        </CreateAddonTitleProvider>
    );
};

export default memo(CreateAddonTitleView);
