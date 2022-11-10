/* react */
import { memo } from 'react';
import { Outlet } from 'react-router-dom';

const LinkedLayout = () => {
    return <Outlet />;
};

export default memo(LinkedLayout);
