/* react */
import { DetailedHTMLProps, HTMLAttributes } from 'react';
/* props */
import { ChildrenProps } from 'shared/props';
/* types */
import { Orientation } from 'shared/types';

export interface PanelLayoutProps
    extends Omit<
            DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
            'children' | 'ref'
        >,
        ChildrenProps {
    orientation?: Orientation;
}
