/* react */
import { Fragment, memo } from 'react';
import { useTranslation } from 'react-i18next';
/* context */
import { useProductDetailContext } from '../ProductDetail.context';
/* components */
import { Button, Legend } from 'shared/components';
import { Badge } from 'admin/core';
/* assets */
import { MdEdit } from 'react-icons/md';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './ProductDetailCollection.module.scss';
import { MainTitleListItemDTO, TitleListItemDTO } from 'admin/collections/types';

const ProductDetailCollectionSection = () => {
    const {
        /* states */
        product,
        mainTitleList,
        addonTitleList,
        showUpdateCollection,
    } = useProductDetailContext();

    const { t, i18n } = useTranslation();

    return (
        <section className={styles.Collection}>
            <div className={styles.Header}>
                <h2 title={t('views.productdetail.collection.header')}>
                    <Legend hasDots>{t('views.productdetail.collection.header')}</Legend>
                </h2>

                <Button
                    className={ButtonStyles.OutlineNone}
                    onClick={showUpdateCollection}
                    title={t('views.productdetail.collection.edit')}>
                    <i>
                        <MdEdit />
                    </i>
                </Button>
            </div>

            <div className={styles.Content}>
                {(product?.mainCollection.length ?? 0) > 0 ? (
                    <>
                        <Legend hasDots title={t('views.productdetail.collection.main')} className={styles.Title}>
                            {t('views.productdetail.collection.main')}
                        </Legend>

                        <div className={styles.TitleCollection}>
                            {mainTitleList
                                .reduce(
                                    (prev, current) =>
                                        product?.mainCollection.find(main => main.titleId === current.titleId) !==
                                        undefined
                                            ? [...prev, current]
                                            : prev,
                                    [] as MainTitleListItemDTO[]
                                )
                                .map((title, index) => (
                                    <Fragment key={index}>
                                        <Badge>
                                            <Legend hasDots>
                                                {title.titleCollection.find(
                                                    collection => collection.lang === i18n.language
                                                )?.ref ?? title.defaultTitle}
                                            </Legend>
                                        </Badge>
                                    </Fragment>
                                ))}
                        </div>
                    </>
                ) : (
                    <Legend
                        hasDots
                        justify="center"
                        title={t('views.productdetail.collection.nomain')}
                        className={styles.Title}>
                        {t('views.productdetail.collection.nomain')}
                    </Legend>
                )}

                {(product?.accesoryCollection.length ?? 0) > 0 ? (
                    <>
                        <Legend hasDots title={t('views.productdetail.collection.accesory')} className={styles.Title}>
                            {t('views.productdetail.collection.accesory')}
                        </Legend>

                        <div className={styles.TitleCollection}>
                            {addonTitleList
                                .reduce(
                                    (prev, current) =>
                                        product?.accesoryCollection.find(
                                            accesory => accesory.titleId === current.titleId
                                        ) !== undefined
                                            ? [...prev, current]
                                            : prev,
                                    [] as TitleListItemDTO[]
                                )
                                .map((title, index) => (
                                    <Fragment key={index}>
                                        <Badge>
                                            <Legend hasDots>
                                                {title.titleCollection.find(
                                                    collection => collection.lang === i18n.language
                                                )?.ref ?? title.defaultTitle}
                                            </Legend>
                                        </Badge>
                                    </Fragment>
                                ))}
                        </div>
                    </>
                ) : (
                    <Legend
                        hasDots
                        justify="center"
                        title={t('views.productdetail.collection.noaccesory')}
                        className={styles.Title}>
                        {t('views.productdetail.collection.noaccesory')}
                    </Legend>
                )}
            </div>
        </section>
    );
};

export default memo(ProductDetailCollectionSection);
