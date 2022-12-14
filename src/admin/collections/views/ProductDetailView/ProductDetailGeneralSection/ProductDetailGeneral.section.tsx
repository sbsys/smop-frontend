/* react */
import { memo } from 'react';
/* context */
import { useProductDetailContext } from '../ProductDetail.context';
/* components */
import { Button, Legend } from 'shared/components';
/* hooks */
import { useAdminLang, AdminLang } from 'admin/core';
/* utils */
import { classNames } from 'shared/utils';
/* assets */
import { MdCheck, MdClose, MdEdit } from 'react-icons/md';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './ProductDetailGeneral.module.scss';

const ProductDetailGeneralSection = () => {
    const {
        /* states */
        product,
        showUpdateGeneral,
    } = useProductDetailContext();

    const { translate } = useAdminLang();

    return (
        <section className={styles.General}>
            <div className={styles.Header}>
                <h2 title={translate('productdetail.general')}>
                    <Legend hasDots>{translate('productdetail.general')}</Legend>
                </h2>

                <Button
                    className={ButtonStyles.OutlineNone}
                    onClick={showUpdateGeneral}
                    title={translate('actions.edit')}>
                    <i>
                        <MdEdit />
                    </i>
                </Button>
            </div>

            <div className={styles.Content}>
                <div className={styles.Boolean}>
                    <Legend hasDots className={styles.Title}>
                        {translate('commons.multilanguage')}
                    </Legend>

                    <i
                        className={classNames(
                            styles.Icon,
                            product?.multiLanguage ? styles.IconActive : styles.IconInactive
                        )}>
                        {product?.multiLanguage ? <MdCheck /> : <MdClose />}
                    </i>
                </div>

                <Legend hasDots title={translate('productdetail.references')} className={styles.Title}>
                    {translate('productdetail.references')}
                </Legend>

                {product?.multiLanguage ? (
                    <>
                        {product?.referenceCollection.map((reference, index) => (
                            <Legend key={index} title={reference.ref}>
                                <span className={styles.Title}>{reference.lang.toUpperCase()}: </span>

                                <span>
                                    <>{product.markAsAddon && '(addon) '}</>
                                    <>{product.isCombo && '(combo) '}</>
                                    <>{reference.ref}</>
                                </span>
                            </Legend>
                        ))}
                    </>
                ) : (
                    <Legend title={product?.defaultReference}>
                        <>{product?.markAsAddon && '(addon) '}</>
                        <>{product?.isCombo && '(combo) '}</>
                        <>{product?.defaultReference}</>
                    </Legend>
                )}

                <Legend hasDots title={translate('productdetail.description')} className={styles.Title}>
                    {translate('productdetail.description')}
                </Legend>

                {product?.multiLanguage ? (
                    <>
                        {product?.descriptionCollection.map((reference, index) => (
                            <Legend key={index} title={reference.ref}>
                                <span className={styles.Title}>{reference.lang.toUpperCase()}: </span>

                                <span>{reference.ref}</span>
                            </Legend>
                        ))}
                    </>
                ) : (
                    <Legend title={product?.defaultDescription}>{product?.defaultDescription}</Legend>
                )}

                <Legend hasDots title={translate('headers.price')} className={styles.Title}>
                    {translate('headers.price')}
                </Legend>

                <Legend title={`${product?.price} USD`}>{product?.price} USD</Legend>

                <Legend hasDots title={translate('productdetail.maxaccuitems' as AdminLang)} className={styles.Title}>
                    {translate('productdetail.maxaccuitems' as AdminLang)}
                </Legend>

                <Legend>{product?.maxAccuItems}</Legend>

                <Legend hasDots title={translate('productdetail.presentation')} className={styles.Title}>
                    {translate('productdetail.presentation')}
                </Legend>

                {product?.feature ? (
                    <Legend
                        hasDots
                        title={`${product.feature.presentation.defaultDescription} ${product.feature.measure.measure} ${product.feature.measure.unit}`}>
                        <span>{product.feature.presentation.defaultDescription} </span>

                        <span>{product.feature.measure.measure} </span>

                        <span>{product.feature.measure.unit}</span>
                    </Legend>
                ) : (
                    <Legend hasDots title={translate('productdetail.nopresentation')}>
                        {translate('productdetail.nopresentation')}
                    </Legend>
                )}

                <div className={styles.Boolean}>
                    <Legend hasDots className={styles.Title}>
                        {translate('productdetail.allowprompts')}
                    </Legend>

                    <i
                        className={classNames(
                            styles.Icon,
                            product?.allowPrompts ? styles.IconActive : styles.IconInactive
                        )}>
                        {product?.allowPrompts ? <MdCheck /> : <MdClose />}
                    </i>
                </div>
            </div>
        </section>
    );
};

export default memo(ProductDetailGeneralSection);
