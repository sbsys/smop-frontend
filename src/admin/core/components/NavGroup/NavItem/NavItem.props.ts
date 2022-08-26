import { ReactNode } from 'react';
import { NavLinkProps } from 'react-router-dom';

export interface NavItemProps extends NavLinkProps {
    icon: ReactNode | ReactNode[] | (() => ReactNode);
    text: string;
}
