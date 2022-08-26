/* react */
import { FC, memo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
/* layouts */
import { DashboardLayout } from './core';
/* modules */
import { AuthLayout, SignInView } from './auth';
import { CompaniesLayout } from './companies';

const AppRoutes: FC = () => {
    return (
        <Routes>
            <Route path="" element={<Navigate to={'auth'} replace />} />

            {/* authentication module */}
            <Route path="auth" element={<AuthLayout />}>
                <Route index element={<Navigate to={'sign-in'} replace />} />

                <Route path="sign-in" element={<SignInView />} />
            </Route>

            {/* signed in modules */}
            <Route path="dashboard" element={<DashboardLayout />}>
                {/* dashboard */}
                <Route index element={<Navigate to={'home'} replace />} />
                <Route path="home" element={null} />

                {/* companies module */}
                <Route path="companies" element={<CompaniesLayout />}></Route>
            </Route>

            <Route path="*" element={<span>404</span>} />
        </Routes>
    );
};

export default memo(AppRoutes);
