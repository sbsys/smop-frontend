/* react */
import { FC, memo, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
/* hooks */
import { useLocalStorage } from 'shared/hooks';
/* layouts */
import { AdminLayout, DashboardLayout, useAdminDispatch, useAdminNotify, useAdminSelector } from './core';
/* utils */
import { offCustomEvent, onCustomEvent } from 'shared/utils';
/* assets */
import { MdError } from 'react-icons/md';

/* modules */

/* authentication */
import { AuthLayout, authStoreSignIn, ResetPasswordView, selectAuthStore, SignInDTO, SignInView } from './auth';
/* tenants */
import {
    CreateTenantView,
    TenantApiManagementView,
    TenantListView,
    TenantSettingsView,
    TenantsLayout,
} from './tenants';
/* commerces */
import {
    CommerceDetailView,
    CommerceListView,
    CommercesLayout,
    CreateCommerceView,
    MenuMigraterView,
} from './commerces';
/* users */
import { CreateUserView, UserListView, UsersLayout } from './users';
/* collections */
import {
    AddonsTitleListView,
    CollectionsLayout,
    CreateAddonTitleView,
    CreateMainTitleView,
    CreateProductView,
    MainTitleListView,
    ProductDetailView,
    ProductListView,
} from './collections';
/* linked */
import {
    CommerceManagementView,
    CommerceMenuView,
    LinkedLayout,
    LinkedTitleDetailView,
    LinkTitleView,
    UpdateLinkedTitleView,
} from './linked';
/* clients */
import {
    SchemaLayout,
    CommerceDetailView as ClientsCommerceDetailView,
    CommerceListView as ClientsCommerceListView,
    TitleProductListView,
} from './clients';

const AppRoutes: FC = () => {
    const { isAuth, token } = useAdminSelector(selectAuthStore);

    const [authLocalStorage, setAuthLocalStorage, clearAuthLocalStorage] = useLocalStorage<SignInDTO>(
        'auth',
        {} as SignInDTO
    );

    const dispatch = useAdminDispatch();

    const { notify } = useAdminNotify();

    useEffect(() => {
        if (!authLocalStorage?.token) return;

        dispatch(authStoreSignIn(authLocalStorage));
    }, [authLocalStorage, dispatch]);

    useEffect(() => {
        const logout_notify = () => {
            notify('danger', {
                title: 'Signed out',
                icon: <MdError />,
                text: 'Session terminated due to authorization token expiration',
                timestamp: new Date(),
            });

            clearAuthLocalStorage();
        };

        onCustomEvent('logout_notify', logout_notify);

        return () => {
            offCustomEvent('logout_notify', logout_notify);
        };
    }, [clearAuthLocalStorage, notify]);

    useEffect(() => {
        if (authLocalStorage?.token && token && authLocalStorage.token !== token) {
            setAuthLocalStorage(prev => {
                return { ...prev, token };
            });
        }
    }, [authLocalStorage?.token, setAuthLocalStorage, token]);

    return (
        <Routes>
            <Route index element={<Navigate to={'admin'} replace />} />

            <Route path="admin" element={<AdminLayout />}>
                <Route index element={<Navigate to={isAuth ? 'dashboard' : 'auth'} replace />} />

                {/* authentication module */}
                <Route path="auth" element={!isAuth ? <AuthLayout /> : <Navigate to={'../dashboard'} replace />}>
                    <Route index element={<Navigate to={'sign-in'} replace />} />

                    <Route path="sign-in" element={<SignInView />} />
                </Route>

                <Route path="security" element={<AuthLayout />}>
                    {/* <Route index element={<Navigate to={'password-recovery'} replace />} /> */}

                    <Route path="reset-password" element={<ResetPasswordView />} />
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

                    {/* tenants module / current admin organization */}
                    <Route path="organization" element={<TenantsLayout />}>
                        <Route index element={<Navigate to="settings" replace />} />

                        <Route path="settings" element={<TenantSettingsView />} />

                        <Route path="keys" element={<TenantApiManagementView />} />
                    </Route>

                    {/* commerces module */}
                    <Route path="commerces" element={<CommercesLayout />}>
                        <Route index element={<Navigate to="list" replace />} />

                        <Route path="list" element={<CommerceListView />} />

                        <Route path=":commerceId/detail" element={<CommerceDetailView />} />
                        <Route path=":commerceId/menu" element={<MenuMigraterView />} />

                        <Route path="create" element={<CreateCommerceView />} />

                        {/* linked module */}
                        <Route path=":commerceId/management" element={<LinkedLayout />}>
                            <Route path="" element={<CommerceManagementView />}>
                                <Route path="menu" element={<CommerceMenuView />}>
                                    <Route path="link" element={<LinkTitleView />} />

                                    <Route path=":titleId/detail" element={<LinkedTitleDetailView />} />

                                    <Route path=":titleId/edit" element={<UpdateLinkedTitleView />} />
                                </Route>
                            </Route>
                        </Route>
                    </Route>

                    {/* users module */}
                    <Route path="users" element={<UsersLayout />}>
                        <Route index element={<Navigate to="list" replace />} />

                        <Route path="list" element={<UserListView />}>
                            <Route path="create" element={<CreateUserView />} />
                        </Route>
                    </Route>

                    {/* collections module */}
                    <Route path="collections" element={<CollectionsLayout />}>
                        <Route path="menu" element={<MainTitleListView />}>
                            <Route path="create" element={<CreateMainTitleView />} />
                        </Route>

                        <Route path="addons" element={<AddonsTitleListView />}>
                            <Route path="create" element={<CreateAddonTitleView />} />
                        </Route>

                        <Route path="products" element={<ProductListView />} />

                        <Route path="products/create" element={<CreateProductView />} />

                        <Route path="products/:productId" element={<ProductDetailView />} />
                    </Route>
                </Route>
            </Route>

            {/* client side app */}
            <Route path=":schema" element={<SchemaLayout />}>
                <Route index element={<ClientsCommerceListView />} />

                <Route path=":commerceId" element={<ClientsCommerceDetailView />}>
                    <Route path="menu/:titleId" element={<TitleProductListView />} />
                </Route>
            </Route>

            <Route path="*" element={<span>404</span>} />
        </Routes>
    );
};

export default memo(AppRoutes);
