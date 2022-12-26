/* react */
import { memo, useMemo } from 'react';
/* context */
import { useTitleProductListContext } from '../TitleProductList.context';
/* layouts */
import { PanelLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Legend } from 'shared/components';
import { ProductListItem } from '../ProductListItem';
/* hooks */
import { useClientsLang } from 'admin/core';
/* utils */
import { classNames } from 'shared/utils';
/* styles */
import styles from './TitleProductList.module.scss';

const TitleProductList = () => {
    const {
        /* states */
        menuTitle,
        productList,
    } = useTitleProductListContext();

    const hasProducts = useMemo(() => productList.length > 0, [productList.length]);

    const isUnder3 = useMemo(() => productList.length < 3, [productList.length]);

    const { lang } = useClientsLang();

    if (!menuTitle) return <div>No menu title</div>;

    return (
        <PanelLayout orientation="col" className={styles.TitleProductList}>
            <div className={styles.Header}>
                <h3 title={menuTitle.titleCollection.find(title => title.lang === lang)?.ref ?? menuTitle.defaultTitle}>
                    <Legend hasDots justify="center">
                        {menuTitle.titleCollection.find(title => title.lang === lang)?.ref ?? menuTitle.defaultTitle}
                    </Legend>
                </h3>
            </div>

            {hasProducts ? (
                <ScrollLayout orientation="col">
                    <ul className={classNames(styles.Content, isUnder3 && styles.Under3)}>
                        {productList.map((product, index) => (
                            <li key={`${menuTitle.titleId}_${index}`}>
                                <ProductListItem {...product} />
                            </li>
                        ))}
                    </ul>
                </ScrollLayout>
            ) : (
                <div>No menu products</div>
            )}
        </PanelLayout>
    );
};

export default memo(TitleProductList);
