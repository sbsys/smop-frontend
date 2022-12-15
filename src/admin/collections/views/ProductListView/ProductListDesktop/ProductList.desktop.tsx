/* react */
import { memo } from 'react';
/* context */
import { useProductListContext } from '../ProductList.context';
/* hooks */
import { useAdminLang } from 'admin/core';
/* layouts */
import { PanelLayout, TableLayout } from 'shared/layouts';
/* components */
import { Legend } from 'shared/components';
import { ProductListFilter } from '../ProductListFilter';
import { NewProductAction, ProductListActions } from '../ProductListActions';
import { ProductListState } from '../ProductListState';
/* utils */
import { format } from 'date-fns';
/* styles */
import styles from './ProductList.module.scss';

const ProductListDesktop = () => {
    const {
        /* states */
        isBreakPoint,
        productList,
    } = useProductListContext();

    const { translate } = useAdminLang();

    return (
        <PanelLayout className={styles.ProductList}>
            <h1 title={translate('productlist.title')}>
                <Legend hasDots>{translate('productlist.title')}</Legend>
            </h1>

            {isBreakPoint && (
                <section className={styles.Filter}>
                    <ProductListFilter />
                </section>
            )}

            <span>
                <NewProductAction />
            </span>

            <section className={styles.Titles}>
                <TableLayout
                    className={styles.List}
                    header={{
                        columns: [
                            {
                                children: (
                                    <Legend hasDots title={translate('headers.name')}>
                                        {translate('headers.name')}
                                    </Legend>
                                ),
                                span: 3,
                            },
                            {
                                span: 1,
                            },
                            {
                                children: (
                                    <Legend hasDots justify="end" title={translate('headers.price')}>
                                        {translate('headers.price')}
                                    </Legend>
                                ),
                                span: 2,
                            },
                            {
                                children: (
                                    <Legend hasDots justify="center" title={translate('headers.created')}>
                                        {translate('headers.created')}
                                    </Legend>
                                ),
                                span: 2,
                            },
                            {
                                children: (
                                    <Legend hasDots justify="center" title={translate('headers.status')}>
                                        {translate('headers.status')}
                                    </Legend>
                                ),
                                span: 2,
                            },
                            {
                                children: (
                                    <Legend hasDots justify="center" title={translate('headers.actions')}>
                                        {translate('headers.actions')}
                                    </Legend>
                                ),
                                span: 2,
                            },
                        ],
                    }}
                    body={productList.map(item => ({
                        columns: [
                            {
                                children: (
                                    <Legend
                                        hasDots
                                        title={`${item.markAsAddon ? '(addon) ' : item.isCombo ? '(combo) ' : ''}${
                                            item.defaultReference
                                        }`}>
                                        <>{item.markAsAddon && '(addon) '}</>
                                        <>{item.isCombo && '(combo) '}</>
                                        <>{item.defaultReference}</>
                                    </Legend>
                                ),
                            },
                            {
                                children: <img src={item.url} alt={item.defaultReference} crossOrigin="anonymous" />,
                            },
                            {
                                children: (
                                    <Legend justify="end" hasDots title={`${item.price} USD`}>
                                        {item.price} USD
                                    </Legend>
                                ),
                            },
                            {
                                children: (
                                    <Legend
                                        hasDots
                                        justify="center"
                                        title={!item.createdAt ? '' : format(item.createdAt, 'MMM do, yyyy')}>
                                        {!item.createdAt ? '' : format(item.createdAt, 'MMM do, yyyy')}
                                    </Legend>
                                ),
                            },
                            {
                                children: <ProductListState state={item.isActive} />,
                            },
                            {
                                children: <ProductListActions state={item.isActive} productId={item.productId} />,
                            },
                        ],
                    }))}
                />
            </section>
        </PanelLayout>
    );
};

export default memo(ProductListDesktop);
