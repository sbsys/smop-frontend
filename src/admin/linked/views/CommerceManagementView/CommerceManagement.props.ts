/* props */
import { ChildrenProps } from 'shared/props';
/* types */
import { LinkedCommerceSettingsDTO } from 'admin/linked/types';

export interface CommerceManagementContextProps {
    /* states */
    linkedCommerceSettings: LinkedCommerceSettingsDTO | null;
    /* functions */
    getLinkedCommerceSettings: () => Promise<void>;
}

export interface CommerceManagementProviderProps extends ChildrenProps {
    context: CommerceManagementContextProps;
}
