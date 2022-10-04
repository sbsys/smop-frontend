import { memo } from 'react';
import { Outlet } from 'react-router-dom';

const CommercesLayout = () => {
    return (
        <>
            <Outlet />
        </>
    );
};

export default memo(CommercesLayout);
