/* react */
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
/* props */
import { ChildrenProps } from 'shared/props';
/* types */
import { Alignment } from 'shared/types';

export interface DropLayoutProps
    extends Omit<
            DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
            'children'
        >,
        ChildrenProps {
    classNameDrop?: string;
    drop?: ReactNode | ReactNode[] | (() => ReactNode);

    dropCol?: Alignment;
    dropRow?: Alignment;

    anchorCol?: Alignment;
    anchorRow?: Alignment;

    isDrop?: boolean;
    isHoverable?: boolean;
}
