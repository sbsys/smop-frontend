import { createContext, FC, useContext } from 'react';
import { TitleProductListContextProps, TitleProductListProviderProps } from './TitleProductList.props';

const Context = createContext<TitleProductListContextProps>({
    /* states */
    menuTitle: null,
    productList: [],
    selectedProductToAdd: null,
    /* functions */
    handleSelectedProductToAddToCart: () => () => {},
    handleUnSelectedProductToAddToCart: () => {},
});

export const TitleProductListProvider: FC<TitleProductListProviderProps> = ({ context, children }) => {
    return (
        <Context.Provider value={context}>{typeof children === 'function' ? children() : children}</Context.Provider>
    );
};

export const useTitleProductListContext = () => useContext(Context);
