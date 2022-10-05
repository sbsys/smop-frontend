/* react */
import { createContext, FC, useContext } from 'react';
/* props */
import { TenantSettingsContextProps, TenantSettingsProviderProps } from './TenantSettings.props';

const TenantSettingsContext = createContext<TenantSettingsContextProps>({
    /* states */
    settings: null,
    isUpdateReference: false,
    showUpdateReference: () => {},
    hideUpdateReference: () => {},
    isUpdateSettings: false,
    showUpdateSettings: () => {},
    hideUpdateSettings: () => {},
    isUpdateBranding: false,
    showUpdateBranding: () => {},
    hideUpdateBranding: () => {},
    /* functions */
    getOrganizationSettings: () => new Promise(resolve => resolve()),
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
