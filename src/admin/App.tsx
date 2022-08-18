/* react */
import { FC, memo, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
/* routes */
import AppRoutes from './App.routes';
/* styles */
import './App.scss';

const AdminApp: FC = () => {
    return (
        <BrowserRouter basename="admin">
            <Suspense fallback={<span>Loading...</span>}>
                <AppRoutes />
            </Suspense>
        </BrowserRouter>
    );
};

export default memo(AdminApp);
