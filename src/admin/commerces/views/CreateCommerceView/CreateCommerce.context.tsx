/* react */
import { createContext, FC, useContext } from 'react';
/* props */
import { CreateCommerceContextProps, CreateCommerceProviderProps } from './CreateCommerce.props';

const Context = createContext<CreateCommerceContextProps>({
    /* states */
    countryList: [],
    tabRef: { current: null },
    /* functions */
    handleCreateCommerceSubmit: () => new Promise(resolve => resolve()),
    handleCancelCreateCommerce: () => {},
    handleNextTab: () => {},
    handlePrevTab: () => {},
    /* props */
});

export const CreateCommerceProvider: FC<CreateCommerceProviderProps> = ({ context, children }) => {
    return (
        <Context.Provider value={context}>{typeof children === 'function' ? children() : children}</Context.Provider>
    );
};

export const useCreateCommerceContext = () => useContext(Context);
