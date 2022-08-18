/* react */
import { DetailedHTMLProps, HTMLAttributes } from 'react';
/* props */
import { ChildrenProps } from 'shared/props';
/* types */
import { Alignment } from 'shared/types';

export interface LegendProps
    extends Omit<
            DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>,
            'children'
        >,
        ChildrenProps {
    justify?: Alignment;
    hasDots?: boolean;
    classNameContent?: string;
}
