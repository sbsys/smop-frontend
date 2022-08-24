/* hooks */
import { useNotification } from 'shared/hooks';
/* types */
import { AdminNotifyProps, AdminNotifyType } from '../types';

export const useAdminNotify = () => {
    const { addNotification, removeNotification } = useNotification();

    const notify = (type: AdminNotifyType, data: AdminNotifyProps) => addNotification(type, data);

    return {
        notify,
        unnotify: removeNotification,
    };
};
