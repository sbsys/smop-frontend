/* react */
import { FC, memo } from 'react';
/* context */
import { useTitleProductListContext } from '../TitleProductList.context';
/* components */
import { Button, Legend } from 'shared/components';
/* hooks */
import { useClientsLang } from 'admin/core';
/* utils */
import { amountFormat } from 'shared/utils';
/* types */
import { TitleProductListItem } from 'admin/clients/types';
/* assets */
import { MdAddShoppingCart } from 'react-icons/md';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './ProductListItem.module.scss';

const ProductListItem: FC<TitleProductListItem> = ({
    productId,
    url,
    defaultReference,
    referenceCollection,
    defaultDescription,
    descriptionCollection,
    price,
}) => {
    const {
        /* functions */
        handleSelectedProductToAddToCart,
    } = useTitleProductListContext();

    const { lang, translate } = useClientsLang();

    return (
        <div className={styles.ProductListItem}>
            <img src={url} alt={defaultReference} crossOrigin="anonymous" />

            <div className={styles.Header}>
                <h4 title={referenceCollection.find(reference => reference.lang === lang)?.ref ?? defaultReference}>
                    <Legend justify="center">
                        {referenceCollection.find(reference => reference.lang === lang)?.ref ?? defaultReference}
                    </Legend>
                </h4>

                <Legend
                    title={
                        descriptionCollection.find(description => description.lang === lang)?.ref ?? defaultDescription
                    }>
                    {descriptionCollection.find(description => description.lang === lang)?.ref ?? defaultDescription}
                </Legend>
            </div>

            <Legend justify="end" className={styles.Price} title={`$ ${amountFormat(price, 2)}`}>{`$ ${amountFormat(
                price,
                2
            )}`}</Legend>

            <div className={styles.Actions}>
                <div title={`${translate('cart.on')}: ${'0'}`}>
                    <Legend justify="center">{translate('cart.on')}</Legend>

                    <Legend justify="center">0</Legend>
                </div>

                <Button
                    className={ButtonStyles.FillPrimary}
                    title={`${translate('cart.add')}`}
                    onClick={handleSelectedProductToAddToCart(productId)}>
                    <Legend hasDots justify="center">
                        {translate('cart.add')}
                    </Legend>

                    <i>
                        <MdAddShoppingCart />
                    </i>
                </Button>
            </div>
        </div>
    );
};

export default memo(ProductListItem);
