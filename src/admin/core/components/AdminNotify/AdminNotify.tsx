/* react */
import { FC, memo } from 'react';
/* props */
import { AdminNotifyProps, AdminNotifyType } from 'admin/core/types';
/* layouts */
import { PanelLayout } from 'shared/layouts';
/* components */
import { Button, Legend, NotificationElement } from 'shared/components';
/* hooks */
import { useAdminNotify } from 'admin/core/hooks';
/* utils */
import { format, isDate } from 'date-fns';
import { classNames } from 'shared/utils';
/* assets */
import { MdClose } from 'react-icons/md';
/* styles */
import styles from './AdminNotify.module.scss';

const notifyTypeStrategy: Record<AdminNotifyType, string> = {
    info: styles.Info,
    success: styles.Success,
    warning: styles.Warning,
    danger: styles.Danger,
};

const AdminNotify: FC<NotificationElement<AdminNotifyProps>> = ({
    id,
    type,
    data: { title, icon, text, timestamp },
    ...rest
}) => {
    const { unnotify } = useAdminNotify();

    return (
        <PanelLayout
            className={classNames(styles.AdminNotify, notifyTypeStrategy[type as AdminNotifyType])}
            orientation="col"
            {...rest}>
            <PanelLayout className={styles.Title}>
                <Legend hasDots>{title}</Legend>

                <Button type="button" onClick={() => unnotify(id)}>
                    <i>
                        <MdClose />
                    </i>
                </Button>
            </PanelLayout>

            <Legend className={styles.Date} hasDots justify="end">
                {isDate(timestamp) && format(timestamp as Date, 'do MMM yyyy - hh:mm aaa')}
            </Legend>

            <PanelLayout className={styles.Content}>
                <i>{icon}</i>

                <Legend>{text}</Legend>
            </PanelLayout>
        </PanelLayout>
    );
};

export default memo(AdminNotify);
