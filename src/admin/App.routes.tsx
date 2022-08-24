/* react */
import { FC, memo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
/* layouts */
import { DashboardLayout } from './core';
/* modules */
import { AuthLayout, SignInView } from './auth';

const AppRoutes: FC = () => {
    return (
        <Routes>
            <Route path="" element={<Navigate to={'auth'} replace />} />

            {/* authentication module */}
            <Route path="auth" element={<AuthLayout />}>
                <Route path="" element={<Navigate to={'sign-in'} replace />} />

                <Route path="sign-in" element={<SignInView />} />
            </Route>

            {/* signed in modules */}
            <Route path="dashboard" element={<DashboardLayout />}></Route>

            <Route path="*" element={<span>404</span>} />
        </Routes>
    );
};

export default memo(AppRoutes);
