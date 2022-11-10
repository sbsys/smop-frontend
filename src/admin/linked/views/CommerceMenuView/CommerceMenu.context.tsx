import { createContext, FC, useContext } from 'react';
import { CommerceMenuContextProps, CommerceMenuProviderProps } from './CommerceMenu.props';

const Context = createContext<CommerceMenuContextProps>({});

export const CommerceMenuProvider: FC<CommerceMenuProviderProps> = ({ context, children }) => {
    return (
        <Context.Provider value={context}>{typeof children === 'function' ? children() : children}</Context.Provider>
    );
};

export const useCommerceMenuContext = () => useContext(Context);
