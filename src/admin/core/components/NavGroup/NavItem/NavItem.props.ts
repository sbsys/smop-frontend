import { ReactNode } from 'react';

export interface NavItemProps {
    to: string;
    icon: ReactNode | ReactNode[] | (() => ReactNode);
    text: string;
}
