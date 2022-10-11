/* react */
import { memo } from 'react';
import { Outlet } from 'react-router-dom';

const UsersLayout = () => {
    return (
        <>
            <Outlet />
        </>
    );
};

export default memo(UsersLayout);
