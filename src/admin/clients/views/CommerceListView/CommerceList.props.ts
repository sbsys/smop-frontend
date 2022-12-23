/* props */
import { ChildrenProps } from 'shared/props';
/* types */
import { OrganizationDetail } from 'admin/clients/types';

export interface CommerceListContextProps {
    /* states */
    organization: OrganizationDetail | null;
    /* functions */
    handleSelectCommerce: (commerceId: string) => () => void;
}

export interface CommerceListProviderProps extends ChildrenProps {
    context: CommerceListContextProps;
}
