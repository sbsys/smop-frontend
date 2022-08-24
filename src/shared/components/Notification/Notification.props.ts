/* react */
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
/* props */
import { ChildrenProps } from 'shared/props';
/* types */
import { Alignment, Direction } from 'shared/types';

export interface NotificationLayoutProps<T> extends ChildrenProps<T> {
    colAlignment?: Alignment;
    rowAlignment?: Alignment;
    direction?: Direction;
}

export interface NotificationElement<T = any>
    extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>, 'ref'> {
    id: string;
    type: string;
    data: T;
}

export interface NotificationProps<T> extends ChildrenProps<T> {
    element?: ReactNode | ReactNode[] | ((params: T) => ReactNode);
    duration?: number;
}

export interface NotificationContextProps {
    notifications: NotificationElement[];
    addNotification: <T>(type: string, data: T) => void;
    removeNotification: (id: string) => void;
}
