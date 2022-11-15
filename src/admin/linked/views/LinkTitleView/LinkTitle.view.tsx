/* react */
import { memo } from 'react';
/* custom hook */
import { useLinkTitle } from './useLinkTitle.hook';
/* context */
import { LinkTitleProvider } from './LinkTitle.context';
/* components */
import { LinkTitle } from './LinkTitle';

const LinkTitleView = () => {
    const { context } = useLinkTitle();

    return (
        <LinkTitleProvider context={context}>
            <LinkTitle />
        </LinkTitleProvider>
    );
};

export default memo(LinkTitleView);
