/* react */
import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
/* store */
import { Profile, selectAuthStore } from 'admin/auth';
/* props */
import { ButtonProps } from 'shared/components';
import { DropNavItemProps, NavGroupProps, NavItemProps } from 'admin/core/components';
import { DashboardLayoutContextProps } from './DashboardLayout.props';
/* hooks */
import { useActive, useMinWidth } from 'shared/hooks';
import { useAdminLang } from 'admin/core/hooks';
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
import { HiKey, HiOfficeBuilding } from 'react-icons/hi';

export const useDashboardLayout = () => {
    /* states */
    const {
        user: { profiles },
    } = useAdminSelector(selectAuthStore);

    const [isSidebar, showSidebar, hideSidebar, toggleSidebar] = useActive();

    const { translate } = useAdminLang();

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
        title: translate('actions.close'),
        onClick: hideSidebar,
    };

    const menuProps: ButtonProps = {
        title: isSidebar ? backProps.title : translate('actions.open'),
        onClick: toggleSidebar,
    };

    /* nav items */
    const tenantsNavItem: NavItemProps = {
        icon: <MdDashboardCustomize />,
        text: translate('links.organizations'),
        to: 'tenants',
    };

    const organizationNavItem: NavItemProps = {
        icon: <HiOfficeBuilding />,
        text: translate('links.organization'),
        to: 'organization',
        end: true,
    };

    const keysNavItem: NavItemProps = {
        icon: <HiKey />,
        text: translate('links.keys'),
        to: 'organization/keys',
    };

    const commercesNavItem: NavItemProps = {
        icon: <MdStore />,
        text: translate('links.commerces'),
        to: 'commerces',
    };

    const usersNavItem: NavItemProps = {
        icon: <MdSupervisedUserCircle />,
        text: translate('links.users'),
        to: 'users',
    };

    const collectionsNavItem: DropNavItemProps = {
        icon: <MdLibraryBooks />,
        text: translate('links.shelf'),
        items: [
            {
                icon: <MdMenuBook />,
                text: translate('links.titles'),
                to: 'collections/menu',
            },
            {
                icon: <MdBook />,
                text: translate('links.addons'),
                to: 'collections/addons',
            },
            {
                icon: <MdFormatListNumbered />,
                text: translate('links.products'),
                to: 'collections/products',
            },
        ],
    };

    /* const linkedNavItem: DropNavItemProps = {
        icon: <MdLink />,
        text: translate('links.linked'),
        items: [
            {
                icon: <MdStore />,
                text: translate('links.linkedcommerce'),
                to: 'linked/commerce',
            },
        ],
    }; */

    const navStrategy: Record<Profile, NavGroupProps[]> = {
        root: [
            {
                title: translate('profiles.root'),
                items: [tenantsNavItem],
            },
        ],
        admin: [
            {
                title: translate('profiles.admin'),
                items: [organizationNavItem, keysNavItem, commercesNavItem, usersNavItem, collectionsNavItem],
            },
        ],
        manager: [
            {
                title: translate('profiles.manager'),
                items: [organizationNavItem, commercesNavItem, usersNavItem, /* linkedNavItem, */ collectionsNavItem],
            },
        ],
        auxiliar: [
            {
                title: translate('profiles.auxiliar'),
                items: [organizationNavItem, commercesNavItem, usersNavItem, /* linkedNavItem, */ collectionsNavItem],
            },
        ],
        cashier: [],
        waiter: [],
    };

    const groups: NavGroupProps[] = [
        {
            title: translate('links.dashboard'),
            items: [
                {
                    icon: <MdDashboard />,
                    text: translate('links.home'),
                    to: 'home',
                },
            ],
        },
        ...(navStrategy[profiles] ?? []),
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
