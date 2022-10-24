/* react */
import { memo } from 'react';
import { Outlet } from 'react-router-dom';
/* layouts */
import { PanelLayout } from 'shared/layouts';

const CollectionsLayout = () => {
    return (
        <PanelLayout orientation="col">
            <Outlet />
        </PanelLayout>
    );
};

export default memo(CollectionsLayout);
