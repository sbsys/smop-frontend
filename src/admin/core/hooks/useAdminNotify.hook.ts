/* hooks */
import { useNotification } from 'shared/hooks';
/* types */
import { AdminNotifyProps, AdminNotifyType } from '../types';

export const useAdminNotify = () => {
    const { addNotification, removeNotification } = useNotification();

    return {
        notify: (type: AdminNotifyType, data: AdminNotifyProps) => addNotification(type, data),
        unnotify: removeNotification,
    };
};
