/* react */
import { memo } from 'react';
/* custom hook */
import { useProductList } from './useProductList.hook';
/* context */
import { ProductListProvider } from './ProductList.context';
/* components */
import { ProductListMobile } from './ProductListMobile';
import { ProductListDesktop } from './ProductListDesktop';

const ProductListView = () => {
    const { context } = useProductList();

    return (
        <ProductListProvider context={context}>
            <ProductListMobile />

            <ProductListDesktop />
        </ProductListProvider>
    );
};

export default memo(ProductListView);
