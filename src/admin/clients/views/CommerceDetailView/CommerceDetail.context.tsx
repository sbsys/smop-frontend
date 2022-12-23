/* react */
import { createContext, FC, useContext } from 'react';
/* props */
import { CommerceDetailContextProps, CommerceDetailProviderProps } from './CommerceDetail.props';

const Context = createContext<CommerceDetailContextProps>({
    /* states */
    isCommerce: false,
    commerce: null,
});

export const CommerceDetailProvider: FC<CommerceDetailProviderProps> = ({ context, children }) => {
    return (
        <Context.Provider value={context}>{typeof children === 'function' ? children() : children}</Context.Provider>
    );
};

export const useCommerceDetailContext = () => useContext(Context);
