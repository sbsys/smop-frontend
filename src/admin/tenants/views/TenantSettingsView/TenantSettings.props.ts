/* props */
import { ChildrenProps } from 'shared/props';

export interface TenantSettingsContextProps {}

export interface TenantSettingsProviderProps extends ChildrenProps {
    context: TenantSettingsContextProps;
}
