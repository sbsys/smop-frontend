/* react */
import { FC, memo, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Loader } from 'shared/components';
/* routes */
import AppRoutes from './App.routes';
/* components */
import { AdminLoader } from './core';
/* styles */
import './App.scss';

const AdminApp: FC = () => {
    return (
        <BrowserRouter basename="admin">
            <Suspense fallback={<span>Loading...</span>}>
                <Loader element={<AdminLoader />}>
                    <AppRoutes />
                </Loader>
            </Suspense>
        </BrowserRouter>
    );
};

export default memo(AdminApp);
