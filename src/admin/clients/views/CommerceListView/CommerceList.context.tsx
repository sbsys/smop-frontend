/* react */
import { createContext, FC, useContext } from 'react';
/* props */
import { CommerceListContextProps, CommerceListProviderProps } from './CommerceList.props';

const Context = createContext<CommerceListContextProps>({
    /* states */
    organization: null,
    /* functions */
    handleSelectCommerce: () => () => {},
});

export const CommerceListProvider: FC<CommerceListProviderProps> = ({ children, context }) => {
    return (
        <Context.Provider value={context}>{typeof children === 'function' ? children() : children}</Context.Provider>
    );
};

export const useCommerceListContext = () => useContext(Context);
