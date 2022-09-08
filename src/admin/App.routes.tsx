/* react */
import { FC, memo, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
/* hooks */
import { useLocalStorage } from 'shared/hooks';
/* layouts */
import { DashboardLayout, useAdminDispatch, useAdminSelector } from './core';

/* modules */

/* authentication */
import { AuthLayout, authStoreSignIn, selectAuthStore, SignInView } from './auth';
/* tenants */
import { CreateTenantView, TenantListView, TenantsLayout } from './tenants';
/* companies */
import { CompaniesLayout } from './companies';

const AppRoutes: FC = () => {
    const { isAuth } = useAdminSelector(selectAuthStore);

    const [authLocalStorage] = useLocalStorage('auth', null);

    const dispatch = useAdminDispatch();

    useEffect(() => {
        if (!authLocalStorage) return;

        dispatch(authStoreSignIn(authLocalStorage));
    }, [authLocalStorage, dispatch]);

    return (
        <Routes>
            <Route path="" element={<Navigate to={isAuth ? 'dashboard' : 'auth'} replace />} />

            {/* authentication module */}
            <Route path="auth" element={!isAuth ? <AuthLayout /> : <Navigate to={'../dashboard'} replace />}>
                <Route index element={<Navigate to={'sign-in'} replace />} />

                <Route path="sign-in" element={<SignInView />} />
            </Route>

            {/* signed in modules */}
            <Route path="dashboard" element={isAuth ? <DashboardLayout /> : <Navigate to={'../auth'} replace />}>
                {/* dashboard */}
                <Route index element={<Navigate to={'home'} replace />} />
                <Route path="home" element={null} />

                {/* tenants module */}
                <Route path="tenants" element={<TenantsLayout />}>
                    <Route index element={<Navigate to={'list'} replace />} />

                    <Route path="list" element={<TenantListView />}>
                        <Route path="create" element={<CreateTenantView />} />
                    </Route>
                </Route>

                {/* companies module */}
                <Route path="companies" element={<CompaniesLayout />}></Route>
            </Route>

            <Route path="*" element={<span>404</span>} />
        </Routes>
    );
};

export default memo(AppRoutes);
