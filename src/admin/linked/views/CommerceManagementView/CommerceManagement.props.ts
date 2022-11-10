import { ChildrenProps } from 'shared/props';

export interface CommerceManagementContextProps {
    /* states */
    /* functions */
    getLinkedCommerceSettings: () => Promise<void>;
}

export interface CommerceManagementProviderProps extends ChildrenProps {
    context: CommerceManagementContextProps;
}
