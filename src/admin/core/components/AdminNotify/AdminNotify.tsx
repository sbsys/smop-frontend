/* react */
import { FC, memo } from 'react';
/* props */
import { AdminNotifyProps } from 'admin/core/types';
/* utils */
import { classNames } from 'shared/utils';
/* styles */
import styles from './AdminNotify.module.scss';

const AdminNotify: FC<AdminNotifyProps> = () => {
    return <div className={classNames(styles.AdminNotify)}>AdminNotify</div>;
};

export default memo(AdminNotify);
