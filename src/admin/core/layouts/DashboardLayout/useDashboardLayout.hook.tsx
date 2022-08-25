/* props */
import { ButtonProps } from 'shared/components';
import { DashboardLayoutContextProps } from './DashboardLayout.props';
import { NavGroupProps } from 'admin/core/components';
/* assets */
import { MdDashboard, MdStore } from 'react-icons/md';

export const useDashboardLayout = () => {
    /* props */
    const backProps: ButtonProps = {
        title: 'Close sidebar',
        onClick: () => {},
    };

    const groups: NavGroupProps[] = [
        {
            title: 'Home',
            items: [
                {
                    icon: <MdDashboard />,
                    text: 'Dashboard',
                    to: '',
                },
            ],
        },
        {
            title: 'Root',
            items: [
                {
                    icon: <MdStore />,
                    text: 'Companies',
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
