/* props */
import { ChildrenProps } from 'shared/props';

export interface TenantSettingsContextProps {
    /* states */
    isUpdateReference: boolean;
    showUpdateReference: () => void;
    hideUpdateReference: () => void;
    isUpdateBranding: boolean;
    showUpdateBranding: () => void;
    hideUpdateBranding: () => void;
    /* props */
}

export interface TenantSettingsProviderProps extends ChildrenProps {
    context: TenantSettingsContextProps;
}
