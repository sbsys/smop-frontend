import { createContext, FC, useContext } from 'react';
import { CreateProductContextProps, CreateProductProviderProps } from './CreateProduct.props';

const Context = createContext<CreateProductContextProps>({
    /* states */
    mainTitleList: [],
    addonTitleList: [],
    tabRef: { current: null },
    /* functions */
    handleCreateProductSubmit: _ => new Promise(resolve => resolve()),
    handleCancelCreateProduct: () => {},
    handleNextTab: () => {},
    handlePrevTab: () => {},
});

export const CreateProductProvider: FC<CreateProductProviderProps> = ({ context, children }) => {
    return (
        <Context.Provider value={context}>{typeof children === 'function' ? children() : children}</Context.Provider>
    );
};

export const useCreateProductContext = () => useContext(Context);
