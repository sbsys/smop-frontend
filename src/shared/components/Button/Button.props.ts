/* react */
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
/* props */
import { ChildrenProps } from 'shared/props';

export interface ButtonProps
    extends Omit<
            DetailedHTMLProps<
                ButtonHTMLAttributes<HTMLButtonElement>,
                HTMLButtonElement
            >,
            'children'
        >,
        ChildrenProps {}
