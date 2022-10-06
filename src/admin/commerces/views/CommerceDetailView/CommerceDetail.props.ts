/* props */
import { ChildrenProps } from 'shared/props';
/* types */
import { CommerceDetailDTO } from 'admin/commerces/types';

export interface CommerceDetailContextProps {
    /* states */
    commerce: CommerceDetailDTO | null;
    /* functions */
    /* props */
}

export interface CommerceDetailProviderProps extends ChildrenProps {
    context: CommerceDetailContextProps;
}
