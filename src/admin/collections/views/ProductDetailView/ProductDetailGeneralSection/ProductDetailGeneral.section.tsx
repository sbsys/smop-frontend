/* react */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
/* context */
import { useProductDetailContext } from '../ProductDetail.context';
/* components */
import { Button, Legend } from 'shared/components';
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
    } = useProductDetailContext();

    const { t } = useTranslation();

    return (
        <section className={styles.General}>
            <div className={styles.Header}>
                <h2 title={t('views.productdetail.general.header')}>
                    <Legend hasDots>{t('views.productdetail.general.header')}</Legend>
                </h2>

                <Button className={ButtonStyles.OutlineNone} title={t('views.productdetail.general.edit')}>
                    <i>
                        <MdEdit />
                    </i>
                </Button>
            </div>

            <div className={styles.Content}>
                <div className={styles.Boolean}>
                    <Legend hasDots className={styles.Title}>
                        {t('views.productdetail.general.multilanguage')}
                    </Legend>

                    <i
                        className={classNames(
                            styles.Icon,
                            product?.multiLanguage ? styles.IconActive : styles.IconInactive
                        )}>
                        {product?.multiLanguage ? <MdCheck /> : <MdClose />}
                    </i>
                </div>

                <Legend hasDots title={t('views.productdetail.general.reference')} className={styles.Title}>
                    {t('views.productdetail.general.reference')}
                </Legend>

                {product?.multiLanguage ? (
                    <>
                        {product?.referenceCollection.map((reference, index) => (
                            <Legend key={index} title={reference.ref}>
                                <span className={styles.Title}>{reference.lang.toUpperCase()}: </span>

                                <span>{reference.ref}</span>
                            </Legend>
                        ))}
                    </>
                ) : (
                    <Legend title={product?.defaultReference}>{product?.defaultReference}</Legend>
                )}

                <Legend hasDots title={t('views.productdetail.general.description')} className={styles.Title}>
                    {t('views.productdetail.general.description')}
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

                <Legend hasDots title={t('views.productdetail.general.presentation')} className={styles.Title}>
                    {t('views.productdetail.general.presentation')}
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
                    <Legend hasDots title={t('views.productdetail.general.nopresentation')}>
                        {t('views.productdetail.general.nopresentation')}
                    </Legend>
                )}

                <div className={styles.Boolean}>
                    <Legend hasDots className={styles.Title}>
                        {t('views.productdetail.general.allowprompts')}
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
