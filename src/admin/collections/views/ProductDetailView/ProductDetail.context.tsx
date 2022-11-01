/* react */
import { createContext, FC, useContext } from 'react';
/* props */
import { ProductDetailContextProps, ProductDetailProviderProps } from './ProductDetail.props';

const Context = createContext<ProductDetailContextProps>({});

export const ProductDetailProvider: FC<ProductDetailProviderProps> = ({ context, children }) => {
    return (
        <Context.Provider value={context}>{typeof children === 'function' ? children() : children}</Context.Provider>
    );
};

export const useProductDetailContext = () => useContext(Context);
