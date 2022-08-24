/* react */
import { FC, memo } from 'react';
/* props */
import { NotificationContextProps, NotificationProps } from './Notification.props';
/* context */
import { NotificationContext } from './Notification.context';
/* custom hook */
import { useNotification } from './useNotification.hook';

const Notification: FC<NotificationProps<NotificationContextProps>> = ({ element, duration = 5000, children }) => {
    const { context } = useNotification(duration);

    return (
        <NotificationContext.Provider value={context}>
            {typeof children === 'function' ? children(context) : children}

            {typeof element === 'function' ? element(context) : element}
        </NotificationContext.Provider>
    );
};

export default memo(Notification);
