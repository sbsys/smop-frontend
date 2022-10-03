/* react */
import { createContext, FC, useContext } from 'react';
/* props */
import { TenantSettingsContextProps, TenantSettingsProviderProps } from './TenantSettings.props';
/* types */
import { OrganizationSettingsDTO } from 'admin/tenants/types';

const TenantSettingsContext = createContext<TenantSettingsContextProps>({
    /* states */
    settings: {} as OrganizationSettingsDTO,
    isUpdateReference: false,
    showUpdateReference: () => {},
    hideUpdateReference: () => {},
    isUpdateSettings: false,
    showUpdateSettings: () => {},
    hideUpdateSettings: () => {},
    isUpdateBranding: false,
    showUpdateBranding: () => {},
    hideUpdateBranding: () => {},
    /* props */
});

const TenantSettingsProvider: FC<TenantSettingsProviderProps> = ({ context, children }) => {
    return (
        <TenantSettingsContext.Provider value={context}>
            {typeof children === 'function' ? children() : children}
        </TenantSettingsContext.Provider>
    );
};

const useTenantSettingsContext = () => useContext(TenantSettingsContext);

export { TenantSettingsProvider, useTenantSettingsContext };
