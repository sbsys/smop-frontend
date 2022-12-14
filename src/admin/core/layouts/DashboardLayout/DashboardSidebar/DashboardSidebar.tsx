/* react */
import { memo, useContext } from 'react';
/* context */
import { Context } from '../DashboardLayout.context';
/* layouts */
import { PanelLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { NavGroup } from 'admin/core/components';
/* assets */
import { MdClose } from 'react-icons/md';
/* styles */
import styles from './DashboardSidebar.module.scss';

const DashboardSidebar = () => {
    const {
        /* states */
        title,
        /* props */
        backProps,
        groups,
    } = useContext(Context);

    return (
        <PanelLayout className={styles.Sidebar} orientation="col">
            <div className={styles.Header}>
                <Legend hasDots title={title}>
                    {title}
                </Legend>

                <Button {...backProps}>
                    <i>
                        <MdClose />
                    </i>
                </Button>
            </div>

            <ScrollLayout orientation="col">
                <nav className={styles.Content}>
                    <ul>
                        {groups.map((group, index) => (
                            <li key={index}>
                                <NavGroup {...group} />
                            </li>
                        ))}
                    </ul>
                </nav>
            </ScrollLayout>
        </PanelLayout>
    );
};

export default memo(DashboardSidebar);
