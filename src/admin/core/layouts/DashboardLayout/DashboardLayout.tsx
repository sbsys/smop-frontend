/* react */
import { memo } from 'react';
/* context */
import { Context } from './DashboardLayout.context';
/* custom hook */
import { useDashboardLayout } from './useDashboardLayout.hook';

const DashboardLayout = () => {
    const { context } = useDashboardLayout();

    return <Context.Provider value={context}>DashboardLayout</Context.Provider>;
};

export default memo(DashboardLayout);
