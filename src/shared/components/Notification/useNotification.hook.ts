/* react */
import { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
/* props */
import { NotificationContextProps, NotificationElement } from './Notification.props';

export const useNotification = (duration: number) => {
    const [notifications, setNotifications] = useState<NotificationElement[]>([]);

    const removeNotification = useCallback(
        (id: string): void =>
            setNotifications(notifications => [...notifications.filter(notification => notification.id !== id)]),
        []
    );

    const addNotification = useCallback(
        <T>(type: string, data: T): void => {
            const id = uuidv4();

            setNotifications(notifications => [...notifications, { type, id, data }]);

            const start = Date.now();

            const keepNotification = (_time: number) => {
                const interval = Date.now() - start;

                if (interval < duration) requestAnimationFrame(keepNotification);
                else removeNotification(id);
            };

            requestAnimationFrame(keepNotification);
        },
        [duration, removeNotification]
    );

    /* context */
    const context: NotificationContextProps = {
        notifications,
        addNotification,
        removeNotification,
    };

    return { context };
};
