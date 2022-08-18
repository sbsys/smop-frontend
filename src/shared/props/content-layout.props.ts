/* react */
import { ReactNode } from 'react';

export interface ContentLayoutProps<BEFORE = null, AFTER = null> {
    beforeContent?: ReactNode | ReactNode[] | ((params?: BEFORE) => ReactNode);
    afterContent?: ReactNode | ReactNode[] | ((params?: AFTER) => ReactNode);
}
