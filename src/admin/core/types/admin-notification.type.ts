import { ReactNode } from 'react';

export interface AdminNotifyProps {
    title?: string;
    icon?: ReactNode;
    text: string;
    timestamp?: Date;
}

export type AdminNotifyType = 'info' | 'success' | 'warning' | 'danger';
