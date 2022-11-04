/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* context */
import { useProductListContext } from '../ProductList.context';
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

    const { t } = useTranslation();

    return (
        <PanelLayout className={styles.ProductList}>
            <h1 title={t('views.productlist.title')}>
                <Legend hasDots>{t('views.productlist.title')}</Legend>
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
                                    <Legend hasDots title={t('views.productlist.list.name')}>
                                        {t('views.productlist.list.name')}
                                    </Legend>
                                ),
                                span: 3,
                            },
                            {
                                span: 1,
                            },
                            {
                                children: (
                                    <Legend hasDots justify="center" title={t('views.productlist.list.created')}>
                                        {t('views.productlist.list.created')}
                                    </Legend>
                                ),
                                span: 2,
                            },
                            {
                                children: (
                                    <Legend hasDots justify="center" title={t('views.productlist.list.state')}>
                                        {t('views.productlist.list.state')}
                                    </Legend>
                                ),
                                span: 2,
                            },
                            {
                                children: (
                                    <Legend hasDots justify="center" title={t('views.productlist.list.actions')}>
                                        {t('views.productlist.list.actions')}
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
                                        title={`${item.markAsAddon ? '(addon) ' : ''}${item.defaultReference}`}>
                                        <>{item.markAsAddon && '(addon) '}</>
                                        <>{item.defaultReference}</>
                                    </Legend>
                                ),
                            },
                            {
                                children: <img src={item.url} alt={item.defaultReference} crossOrigin="anonymous" />,
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
