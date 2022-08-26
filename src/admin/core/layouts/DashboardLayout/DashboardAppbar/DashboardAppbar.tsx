/* react */
import { memo, useContext } from 'react';
/* context */
import { Context } from '../DashboardLayout.context';
/* components */
import { Button } from 'shared/components';
/* assets */
import { MdMenu } from 'react-icons/md';
/* styles */
import styles from './DashboardAppbar.module.scss';

const DashboardAppbar = () => {
    const {
        /* props */
        menuProps,
    } = useContext(Context);

    return (
        <div className={styles.Appbar}>
            <Button className={styles.Menu} {...menuProps}>
                <i>
                    <MdMenu />
                </i>
            </Button>
        </div>
    );
};

export default memo(DashboardAppbar);
