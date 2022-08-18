/* react */
import { FC, memo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
/* layouts */
/* modules */
import { AuthLayout } from './auth';

const AppRoutes: FC = () => {
    return (
        <Routes>
            <Route path="" element={<Navigate to={'auth'} replace />} />

            <Route path="auth" element={<AuthLayout />}>
                <Route path="" element={<Navigate to={'sign-in'} replace />} />

                <Route path="sign-in" element={null} />
            </Route>

            <Route path="*" element={<span>404</span>} />
        </Routes>
    );
};

export default memo(AppRoutes);
