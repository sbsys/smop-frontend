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
/* styles */
import styles from './ProductList.module.scss';

const ProductListDesktop = () => {
    const {
        /* states */
        /* isBreakPoint,
        addonsTitleList, */
    } = useProductListContext();

    const { t } = useTranslation();

    return (
        <PanelLayout className={styles.ProductList}>
            <h1 title={t('views.productlist.title')}>
                <Legend hasDots>{t('views.productlist.title')}</Legend>
            </h1>

            {
                /* isBreakPoint */ true && (
                    <section className={styles.Filter}>
                        <ProductListFilter />
                    </section>
                )
            }

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
                            },
                            {
                                children: (
                                    <Legend hasDots justify="center" title={t('views.productlist.list.created')}>
                                        {t('views.productlist.list.created')}
                                    </Legend>
                                ),
                            },
                            {
                                children: (
                                    <Legend hasDots justify="center" title={t('views.productlist.list.state')}>
                                        {t('views.productlist.list.state')}
                                    </Legend>
                                ),
                            },
                            {
                                /* children: <NewAddonsTitleAction />, */
                                span: 1,
                            },
                        ],
                    }}
                    body={[].map(_ => ({
                        columns: [
                            /* {
                                children: (
                                    <Legend
                                        hasDots
                                        title={
                                            item.titleCollection.find(collection => collection.lang === i18n.language)
                                                ?.ref ?? item.defaultTitle
                                        }>
                                        {item.titleCollection.find(collection => collection.lang === i18n.language)
                                            ?.ref ?? item.defaultTitle}
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
                                children: <AddonsTitleListState state={item.isActive} />,
                            },
                            {
                                children: <AddonsTitleListActions state={item.isActive} titleId={item.titleId} />,
                            }, */
                        ],
                    }))}
                />
            </section>
        </PanelLayout>
    );
};

export default memo(ProductListDesktop);
