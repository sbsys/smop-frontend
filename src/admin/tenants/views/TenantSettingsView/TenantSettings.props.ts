/* props */
import { ChildrenProps } from 'shared/props';
/* types */
import { OrganizationSettingsDTO } from 'admin/tenants/types';

export interface TenantSettingsContextProps {
    /* states */
    settings: OrganizationSettingsDTO | null;
    orgLink: string;
    isUpdateReference: boolean;
    showUpdateReference: () => void;
    hideUpdateReference: () => void;
    isUpdateSettings: boolean;
    showUpdateSettings: () => void;
    hideUpdateSettings: () => void;
    isUpdateBranding: boolean;
    showUpdateBranding: () => void;
    hideUpdateBranding: () => void;
    /* functions */
    getOrganizationSettings: () => Promise<void>;
    getOrganizationLink: () => Promise<void>;
    handleCopyToClipboard: () => void;
    /* props */
}

export interface TenantSettingsProviderProps extends ChildrenProps {
    context: TenantSettingsContextProps;
}
