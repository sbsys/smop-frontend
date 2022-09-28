/* react */
import { createContext, FC, useContext } from 'react';
/* props */
import { TenantSettingsContextProps, TenantSettingsProviderProps } from './TenantSettings.props';

const TenantSettingsContext = createContext<TenantSettingsContextProps>({
    /* states */
    isUpdateReference: false,
    showUpdateReference: () => {},
    hideUpdateReference: () => {},
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
