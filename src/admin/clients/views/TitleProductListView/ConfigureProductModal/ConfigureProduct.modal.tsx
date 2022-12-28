/* react */
import { memo } from 'react';
/* custom hook */
import { useConfigureProduct } from './useConfigureProduct.hook';
/* layouts */
import { ModalLayout, PanelLayout, ScrollLayout } from 'shared/layouts';
/* components */
import { Button, Legend } from 'shared/components';
/* hooks */
import { FieldSet, useClientsLang } from 'admin/core';
/* utils */
import { amountFormat } from 'shared/utils';
/* assets */
import { MdAddShoppingCart } from 'react-icons/md';
import { IoMdCloseCircle } from 'react-icons/io';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './ConfigureProduct.module.scss';

const ConfigureProductModal = () => {
    const {
        isSelectedProductToAdd,
        selectedProductToAdd,
        handleCloseAddToCart,
        productAmountProps,
        productSubTotal,
        handleAddTocart,
        configurationFieldProps,
    } = useConfigureProduct();

    const { lang, translate } = useClientsLang();

    return (
        <ModalLayout isVisible={isSelectedProductToAdd} hasIndentation rowAlignment="center" colAlignment="center">
            <PanelLayout orientation="col" className={styles.ConfigureProduct}>
                <div className={styles.Header}>
                    <h4
                        title={
                            selectedProductToAdd?.referenceCollection.find(reference => reference.lang === lang)?.ref ??
                            selectedProductToAdd?.defaultReference
                        }>
                        <Legend hasDots justify="center">
                            {selectedProductToAdd?.referenceCollection.find(reference => reference.lang === lang)
                                ?.ref ?? selectedProductToAdd?.defaultReference}
                        </Legend>
                    </h4>

                    <Button title={translate('actions.close')} onClick={handleCloseAddToCart}>
                        <i>
                            <IoMdCloseCircle />
                        </i>
                    </Button>
                </div>

                <ScrollLayout orientation="col">
                    <div className={styles.Content}>
                        {configurationFieldProps.map((field, index) => (
                            <FieldSet {...field} key={index} />
                        ))}
                    </div>
                </ScrollLayout>

                <div className={styles.Actions}>
                    <div>
                        <FieldSet {...productAmountProps} />

                        <Legend justify="center" title={`$ ${amountFormat(productSubTotal, 2)}`}>
                            Total: $ {amountFormat(productSubTotal, 2)}
                        </Legend>
                    </div>

                    <Button
                        className={ButtonStyles.FillPrimary}
                        title={`${translate('cart.add')}`}
                        onClick={handleAddTocart}>
                        <Legend hasDots justify="center">
                            {translate('cart.add')}
                        </Legend>

                        <i>
                            <MdAddShoppingCart />
                        </i>
                    </Button>
                </div>
            </PanelLayout>
        </ModalLayout>
    );
};

export default memo(ConfigureProductModal);
