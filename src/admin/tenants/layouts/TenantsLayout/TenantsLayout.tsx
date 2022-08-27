/* react */
import { memo } from 'react';
import { Outlet } from 'react-router-dom';

const TenantsLayout = () => {
    return (
        <>
            <Outlet />
        </>
    );
};

export default memo(TenantsLayout);
