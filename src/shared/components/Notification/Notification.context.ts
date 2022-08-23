/* react */
import { createContext } from 'react';
/* props */
import { NotificationContextProps } from './Notification.props';

export const NotificationContext = createContext<NotificationContextProps>({
    notifications: [],
    addNotification: <T>(type: string, data: T) => {},
    removeNotification: (id: string) => {},
});
