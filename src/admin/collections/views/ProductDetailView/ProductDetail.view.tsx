/* react */
import { memo } from 'react';
/* custom hook */
import { useProductDetail } from './useProductDetail.hook';
/* context */
import { ProductDetailProvider } from './ProductDetail.context';
/* components */
import { ProductDetail } from './ProductDetail';

const ProductDetailView = () => {
    const { context } = useProductDetail();

    return (
        <ProductDetailProvider context={context}>
            <ProductDetail />
        </ProductDetailProvider>
    );
};

export default memo(ProductDetailView);
