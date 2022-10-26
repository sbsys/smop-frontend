import { createContext, FC, useContext } from 'react';
import { CreateAddonTitleContextProps, CreateAddonTitleProviderProps } from './CreateAddonTitle.props';

const Context = createContext<CreateAddonTitleContextProps>({
    /* functions */
    handleCreateAddonTitle: () => new Promise<void>(resolve => resolve()),
    handleCalcelCreateAddonTitle: () => {},
    /* props */
    createAddonTitleFieldProps: [],
});

export const CreateAddonTitleProvider: FC<CreateAddonTitleProviderProps> = ({ context, children }) => {
    return (
        <Context.Provider value={context}>{typeof children === 'function' ? children() : children}</Context.Provider>
    );
};

export const useCreateAddonTitleContext = () => useContext(Context);
