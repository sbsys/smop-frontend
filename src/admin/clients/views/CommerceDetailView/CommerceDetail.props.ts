import { ChildrenProps } from 'shared/props';

export interface CommerceDetailContextProps {
    /* states */
    isCommerce: boolean;
}

export interface CommerceDetailProviderProps extends ChildrenProps {
    context: CommerceDetailContextProps;
}
