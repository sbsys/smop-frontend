/* react */
import { createContext, FC, useContext } from 'react';
/* props */
import { CreateTenantContextProps, CreateTenantProviderProps } from './CreateTenant.props';

export const CreateTenantContext = createContext<CreateTenantContextProps>({
    /* functions */
    handleCreateTenant: () => new Promise<void>(resolve => resolve()),
    handleCalcelCreateTenant: () => {},
    /* props */
    createTenantFieldProps: [],
});

export const CreateTenantProvider: FC<CreateTenantProviderProps> = ({ context, children }) => {
    return (
        <CreateTenantContext.Provider value={context}>
            {typeof children === 'function' ? children() : children}
        </CreateTenantContext.Provider>
    );
};

export const useCreateTenantContext = () => useContext(CreateTenantContext);
