/* props */
import { ButtonProps } from 'shared/components';
import { DashboardLayoutContextProps } from './DashboardLayout.props';
import { NavGroupProps } from 'admin/core/components';
/* assets */
import { MdDashboard, MdStore } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

export const useDashboardLayout = () => {
    /* states */
    const { t } = useTranslation();

    /* props */
    const backProps: ButtonProps = {
        title: t('dashboard.actions.back'),
        onClick: () => {},
    };

    const groups: NavGroupProps[] = [
        {
            title: t('dashboard.navigation.home.name'),
            items: [
                {
                    icon: <MdDashboard />,
                    text: t('dashboard.navigation.home.items.dashboard'),
                    to: '',
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
        /* props */
        backProps,
        groups,
    };

    return { context };
};
