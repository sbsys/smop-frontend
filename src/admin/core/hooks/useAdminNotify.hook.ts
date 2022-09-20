/* hooks */
import { useCallback } from 'react';
import { useNotification } from 'shared/hooks';
/* types */
import { AdminNotifyProps, AdminNotifyType } from '../types';

export const useAdminNotify = () => {
    const { addNotification, removeNotification } = useNotification();

    const notify = useCallback(
        (type: AdminNotifyType, data: AdminNotifyProps) => addNotification(type, data),
        [addNotification]
    );

    return {
        notify,
        unnotify: removeNotification,
    };
};
