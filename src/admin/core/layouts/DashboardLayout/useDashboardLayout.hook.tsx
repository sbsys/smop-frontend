/* react */
import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
/* props */
import { ButtonProps } from 'shared/components';
import { NavGroupProps } from 'admin/core/components';
import { DashboardLayoutContextProps } from './DashboardLayout.props';
/* hooks */
import { useActive, useMinWidth } from 'shared/hooks';
/* utils */
import { matchBreakPoint } from 'shared/utils';
/* assets */
import { MdDashboard, MdStore } from 'react-icons/md';

export const useDashboardLayout = () => {
    /* states */
    const [isSidebar, showSidebar, hideSidebar, toggleSidebar] = useActive();

    const { t } = useTranslation();

    const [bp] = useMinWidth();
    const isUnderBreakPoint = useMemo(() => matchBreakPoint('2xl', bp).under, [bp]);

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
        {
            title: t('dashboard.navigation.root.name'),
            items: [
                {
                    icon: <MdStore />,
                    text: t('dashboard.navigation.root.items.companies'),
                    to: 'companies',
                },
            ],
        },
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
