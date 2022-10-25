import { createContext, FC, useContext } from 'react';
import { CreateMainTitleContextProps, CreateMainTitleProviderProps } from './CreateMainTitle.props';

const Context = createContext<CreateMainTitleContextProps>({
    /* functions */
    handleCreateMainTitle: () => new Promise<void>(resolve => resolve()),
    handleCalcelCreateMainTitle: () => {},
    /* props */
    createMainTitleFieldProps: [],
});

export const CreateMainTitleProvider: FC<CreateMainTitleProviderProps> = ({ context, children }) => {
    return (
        <Context.Provider value={context}>{typeof children === 'function' ? children() : children}</Context.Provider>
    );
};

export const useCreateMainTitleContext = () => useContext(Context);
