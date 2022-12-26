/* react */
import { memo } from 'react';
/* custom hook */
import { useTitleProductList } from './useTitleProductList.hook';
/* context */
import { TitleProductListProvider } from './TitleProductList.context';
/* components */
import { TitleProductList } from './TitleProductList';

const TitleProductListView = () => {
    const { context } = useTitleProductList();

    return (
        <TitleProductListProvider context={context}>
            <TitleProductList />
        </TitleProductListProvider>
    );
};

export default memo(TitleProductListView);
