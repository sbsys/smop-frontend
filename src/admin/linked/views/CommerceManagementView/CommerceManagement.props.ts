/* props */
import { ChildrenProps } from 'shared/props';
/* types */
import { LinkedCommerceSettings } from 'admin/linked/types';

export interface CommerceManagementContextProps {
    /* states */
    linkedCommerceSettings: LinkedCommerceSettings | null;
    /* functions */
    getLinkedCommerceSettings: () => Promise<void>;
}

export interface CommerceManagementProviderProps extends ChildrenProps {
    context: CommerceManagementContextProps;
}
