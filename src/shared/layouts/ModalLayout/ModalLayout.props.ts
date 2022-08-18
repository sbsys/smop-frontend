/* react */
import { DetailedHTMLProps, HTMLAttributes } from 'react';
/* props */
import { ChildrenProps } from 'shared/props';
/* types */
import { Alignment } from 'shared/types';

export interface ModalLayoutProps
    extends Omit<
            DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
            'children'
        >,
        ChildrenProps {
    isVisible?: boolean;
    hasIndentation?: boolean;

    onClickOverlay?: () => void;

    node?: Element | DocumentFragment;
    nodeId?: string;

    colAlignment?: Alignment;
    rowAlignment?: Alignment;
}
