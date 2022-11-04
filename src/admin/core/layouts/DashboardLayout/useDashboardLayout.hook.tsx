/* react */
import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
/* store */
import { Profile, selectAuthStore } from 'admin/auth';
/* props */
import { ButtonProps } from 'shared/components';
import { DropNavItemProps, NavGroupProps, NavItemProps } from 'admin/core/components';
import { DashboardLayoutContextProps } from './DashboardLayout.props';
/* hooks */
import { useActive, useMinWidth } from 'shared/hooks';
/* services */
import { useAdminSelector } from 'admin/core/services';
/* utils */
import { matchBreakPoint } from 'shared/utils';
/* assets */
import {
    MdBook,
    MdDashboard,
    MdDashboardCustomize,
    MdFormatListNumbered,
    MdLibraryBooks,
    MdMenuBook,
    MdStore,
    MdSupervisedUserCircle,
} from 'react-icons/md';
import { HiOfficeBuilding } from 'react-icons/hi';

export const useDashboardLayout = () => {
    /* states */
    const {
        user: { profiles },
    } = useAdminSelector(selectAuthStore);

    const [isSidebar, showSidebar, hideSidebar, toggleSidebar] = useActive();

    const { t } = useTranslation();

    const [bp] = useMinWidth();
    const isUnderBreakPoint = useMemo(() => matchBreakPoint('3xl', bp).under, [bp]);

    const location = useLocation();

    /* functions */

    /* reactivity */
    useEffect(() => {
        if (isUnderBreakPoint) hideSidebar();
    }, [hideSidebar, isUnderBreakPoint, location]);

    useEffect(() => {
        if (!isUnderBreakPoint) showSidebar();
    }, [isUnderBreakPoint, showSidebar]);

    /* props */
    const backProps: ButtonProps = {
        title: t('dashboard.actions.back'),
        onClick: hideSidebar,
    };

    const menuProps: ButtonProps = {
        title: isSidebar ? backProps.title : t('dashboard.actions.menu'),
        onClick: toggleSidebar,
    };

    /* nav items */
    const tenantsNavItem: NavItemProps = {
        icon: <MdDashboardCustomize />,
        text: t('dashboard.navigation.root.items.tenants'),
        to: 'tenants',
    };

    const organizationNavItem: NavItemProps = {
        icon: <HiOfficeBuilding />,
        text: t('dashboard.navigation.admin.items.organization'),
        to: 'organization',
    };

    const commercesNavItem: NavItemProps = {
        icon: <MdStore />,
        text: t('dashboard.navigation.admin.items.commerces'),
        to: 'commerces',
    };

    const usersNavItem: NavItemProps = {
        icon: <MdSupervisedUserCircle />,
        text: t('dashboard.navigation.admin.items.users'),
        to: 'users',
    };

    const collectionsNavItem: DropNavItemProps = {
        icon: <MdLibraryBooks />,
        text: t('dashboard.navigation.admin.items.collections'),
        items: [
            {
                icon: <MdMenuBook />,
                text: t('dashboard.navigation.admin.items.menu'),
                to: 'collections/menu',
            },
            {
                icon: <MdBook />,
                text: t('dashboard.navigation.admin.items.addons'),
                to: 'collections/addons',
            },
            {
                icon: <MdFormatListNumbered />,
                text: t('dashboard.navigation.admin.items.products'),
                to: 'collections/products',
            },
        ],
    };

    const navStrategy: Record<Profile, NavGroupProps[]> = {
        root: [
            {
                title: t('profiles.root'),
                items: [tenantsNavItem],
            },
        ],
        admin: [
            {
                title: t('profiles.admin'),
                items: [organizationNavItem, commercesNavItem, usersNavItem, collectionsNavItem],
            },
        ],
        manager: [
            {
                title: t('profiles.manager'),
                items: [organizationNavItem, commercesNavItem, usersNavItem, collectionsNavItem],
            },
        ],
        auxiliar: [
            {
                title: t('profiles.auxiliar'),
                items: [organizationNavItem, commercesNavItem, usersNavItem, collectionsNavItem],
            },
        ],
        cashier: [],
        waiter: [],
    };

    const groups: NavGroupProps[] = [
        {
            title: t('dashboard.navigation.dashboard.name'),
            items: [
                {
                    icon: <MdDashboard />,
                    text: t('dashboard.navigation.dashboard.items.home'),
                    to: 'home',
                },
            ],
        },
        ...navStrategy[profiles],
    ];

    /* context */
    const context: DashboardLayoutContextProps = {
        /* states */
        title: 'SMOP Admins',
        isSidebar,
        isUnderBreakPoint,
        /* props */
        backProps,
        menuProps,
        groups,
    };

    return { context };
};
