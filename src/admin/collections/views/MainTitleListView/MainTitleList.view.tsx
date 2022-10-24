/* react */
import { memo } from 'react';
/* custom hook */
import { useMainTitleList } from './useMainTitleList.hook';
/* context */
import { MainTitleListProvider } from './MainTitleList.context';
/* components */
import { MainTitleListMobile } from './MainTitleListMobile';
import { MainTitleListDesktop } from './MainTitleListDesktop';

const MainTitleListView = () => {
    const { context } = useMainTitleList();

    return (
        <MainTitleListProvider context={context}>
            <MainTitleListMobile />

            <MainTitleListDesktop />
        </MainTitleListProvider>
    );
};

export default memo(MainTitleListView);
