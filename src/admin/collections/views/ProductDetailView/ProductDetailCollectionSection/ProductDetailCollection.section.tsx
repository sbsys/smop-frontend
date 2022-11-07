/* react */
import { Fragment, memo } from 'react';
/* context */
import { useProductDetailContext } from '../ProductDetail.context';
/* components */
import { Button, Legend } from 'shared/components';
import { Badge, useAdminLang } from 'admin/core';
/* types */
import { MainTitleListItemDTO, TitleListItemDTO } from 'admin/collections/types';
/* assets */
import { MdEdit } from 'react-icons/md';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './ProductDetailCollection.module.scss';

const ProductDetailCollectionSection = () => {
    const {
        /* states */
        product,
        mainTitleList,
        addonTitleList,
        showUpdateCollection,
    } = useProductDetailContext();

    const { translate, lang } = useAdminLang();

    return (
        <section className={styles.Collection}>
            <div className={styles.Header}>
                <h2 title={translate('productdetail.collection')}>
                    <Legend hasDots>{translate('productdetail.collection')}</Legend>
                </h2>

                <Button
                    className={ButtonStyles.OutlineNone}
                    onClick={showUpdateCollection}
                    title={translate('actions.edit')}>
                    <i>
                        <MdEdit />
                    </i>
                </Button>
            </div>

            <div className={styles.Content}>
                {(product?.mainCollection.length ?? 0) > 0 ? (
                    <>
                        <Legend hasDots title={translate('productdetail.main')} className={styles.Title}>
                            {translate('productdetail.main')}
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
                                                {title.titleCollection.find(collection => collection.lang === lang)
                                                    ?.ref ?? title.defaultTitle}
                                            </Legend>
                                        </Badge>
                                    </Fragment>
                                ))}
                        </div>
                    </>
                ) : (
                    <Legend hasDots justify="center" title={translate('productdetail.nomain')} className={styles.Title}>
                        {translate('productdetail.nomain')}
                    </Legend>
                )}

                {(product?.accesoryCollection.length ?? 0) > 0 ? (
                    <>
                        <Legend hasDots title={translate('productdetail.addon')} className={styles.Title}>
                            {translate('productdetail.addon')}
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
                                                {title.titleCollection.find(collection => collection.lang === lang)
                                                    ?.ref ?? title.defaultTitle}
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
                        title={translate('productdetail.noaddon')}
                        className={styles.Title}>
                        {translate('productdetail.noaddon')}
                    </Legend>
                )}
            </div>
        </section>
    );
};

export default memo(ProductDetailCollectionSection);
