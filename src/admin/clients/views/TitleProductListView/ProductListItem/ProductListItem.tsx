/* react */
import { FC, memo } from 'react';
/* components */
import { Button, Legend } from 'shared/components';
/* hooks */
import { useClientsLang } from 'admin/core';
/* types */
import { TitleProductListItem } from 'admin/clients/types';
/* styles */
import styles from './ProductListItem.module.scss';
import { amountFormat } from 'shared/utils';
import { MdAddShoppingCart } from 'react-icons/md';
import { ButtonStyles } from 'shared/styles';

const ProductListItem: FC<TitleProductListItem> = ({
    url,
    defaultReference,
    referenceCollection,
    defaultDescription,
    descriptionCollection,
    price,
}) => {
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

                <Button className={ButtonStyles.FillPrimary} title={`${translate('cart.add')}`}>
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
