/* react */
import { memo } from 'react';
/* context */
import { useProductListContext } from '../ProductList.context';
/* layouts */
import { DropLayout, PanelLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
import { ProductListFilter } from '../ProductListFilter';
import { NewProductAction } from '../ProductListActions';
import { ProductListItem } from '../ProductListItem';
/* hooks */
import { useAdminLang } from 'admin/core';
/* assets */
import { MdClose, MdFilterList } from 'react-icons/md';
/* styles */
import styles from './ProductList.module.scss';

const ProductListMobile = () => {
    const {
        /* states */
        isDropFilter,
        isBreakPoint,
        productList,
        showDropFilter,
        hideDropFilter,
    } = useProductListContext();

    const { translate } = useAdminLang();

    return (
        <PanelLayout className={styles.ProductList}>
            <div className={styles.Header}>
                <h1 title={translate('productlist.title')}>
                    <Legend hasDots>{translate('productlist.title')}</Legend>
                </h1>

                <DropLayout
                    isDrop={isDropFilter && !isBreakPoint}
                    dropCol="start"
                    dropRow="end"
                    anchorCol="start"
                    anchorRow="end"
                    drop={
                        <PanelLayout className={styles.FilterContent} orientation="col">
                            <Button title={translate('actions.close')} onClick={hideDropFilter}>
                                <i>
                                    <MdClose />
                                </i>
                            </Button>

                            {!isBreakPoint && <ProductListFilter />}
                        </PanelLayout>
                    }>
                    <Button className={styles.Filter} title={translate('actions.open')} onClick={showDropFilter}>
                        <i>
                            <MdFilterList />
                        </i>
                    </Button>
                </DropLayout>
            </div>

            <span>
                <NewProductAction />
            </span>

            <ScrollLayout classNameContent={styles.List} orientation="col">
                <ul>
                    {productList.map((product, index) => (
                        <li key={index}>{<ProductListItem {...product} />}</li>
                    ))}
                </ul>
            </ScrollLayout>
        </PanelLayout>
    );
};

export default memo(ProductListMobile);
