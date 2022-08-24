/* react */
import { useContext } from 'react';
/* context */
import { NotificationContext } from 'shared/components';

export const useNotification = () => useContext(NotificationContext);
