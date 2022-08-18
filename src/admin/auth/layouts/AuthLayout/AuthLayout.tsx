/* react */
import { memo } from 'react';
import { Outlet } from 'react-router-dom';
/* layouts */
import { PanelLayout } from 'shared/layouts';

const AuthLayout = () => {
    return (
        <PanelLayout orientation="col">
            <Outlet />
        </PanelLayout>
    );
};

export default memo(AuthLayout);
