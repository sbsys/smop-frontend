/* react */
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
/* props */
import { ChildrenProps } from 'shared/props';
/* types */
import { Position } from 'shared/types';

export interface AccordionLayoutProps
    extends Omit<
            DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
            'children' | 'ref'
        >,
        ChildrenProps {
    classNameAccordion?: string;
    accordion?: ReactNode | ReactNode[] | (() => ReactNode);

    openTo?: Position;

    isAccordion?: boolean;
    isHoverable?: boolean;
}
