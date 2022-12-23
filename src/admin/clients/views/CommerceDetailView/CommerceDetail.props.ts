/* props */
import { ChildrenProps } from 'shared/props';
/* types */
import { CommerceDetail } from 'admin/clients/types';

export interface CommerceDetailContextProps {
    /* states */
    isCommerce: boolean;
    commerce: CommerceDetail | null;
}

export interface CommerceDetailProviderProps extends ChildrenProps {
    context: CommerceDetailContextProps;
}
