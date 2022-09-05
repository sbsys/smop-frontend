/* react */
import { memo } from 'react';
/* context */
import { Context } from './DashboardLayout.context';
/* custom hook */
import { useDashboardLayout } from './useDashboardLayout.hook';
/* components */
import { Dashboard } from './Dashboard';

const DashboardLayout = () => {
    const { context } = useDashboardLayout();

    return (
        <Context.Provider value={context}>
            <Dashboard />
        </Context.Provider>
    );
};

export default memo(DashboardLayout);
