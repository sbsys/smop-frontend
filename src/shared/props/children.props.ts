/* react */
import { ReactNode } from 'react';

export interface ChildrenProps<T = null> {
    children?: ReactNode | ReactNode[] | ((params?: T) => ReactNode);
}
