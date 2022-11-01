import { ChildrenProps } from 'shared/props';

export interface ProductDetailContextProps {}

export interface ProductDetailProviderProps extends ChildrenProps {
    context: ProductDetailContextProps;
}
