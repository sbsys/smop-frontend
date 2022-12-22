/* react */
import { Fragment, memo } from 'react';
/* context */
import { useProductDetailContext } from '../ProductDetail.context';
/* components */
import { Button, Legend } from 'shared/components';
import { AdminLang, Badge, useAdminLang } from 'admin/core';
/* types */
import { MainTitleListItemDTO, ComplementTitleListItemDTO } from 'admin/collections/types';
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
                <Legend hasDots title={translate('productdetail.maxaccuitems' as AdminLang)}>
                    <span className={styles.Title}>{translate('productdetail.maxaccuitems' as AdminLang)}: </span>

                    <span>{product?.maxAccuItems}</span>
                </Legend>

                {(product?.mainCollection.length ?? 0) > 0 ? (
                    <>
                        <Legend title={translate('productdetail.main')} className={styles.Title}>
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
                        <Legend title={translate('productdetail.addon')} className={styles.Title}>
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
                                    [] as ComplementTitleListItemDTO[]
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

                {(product?.comboChoice.length ?? 0) > 0 ? (
                    <>
                        <Legend title={translate('productdetail.combo' as AdminLang)} className={styles.Title}>
                            {translate('productdetail.combo' as AdminLang)}
                        </Legend>

                        <div className={styles.TitleCollection}>
                            {addonTitleList
                                .reduce(
                                    (prev, current) =>
                                        product?.comboChoice.find(multiple => multiple.titleId === current.titleId) !==
                                        undefined
                                            ? [...prev, current]
                                            : prev,
                                    [] as ComplementTitleListItemDTO[]
                                )
                                .map((title, index) => (
                                    <Fragment key={index}>
                                        <Badge>
                                            <Legend hasDots>
                                                {`${
                                                    title.titleCollection.find(collection => collection.lang === lang)
                                                        ?.ref ?? title.defaultTitle
                                                } (up to ${title.maxAccuSubItem})`}
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
                        title={translate('productdetail.nocombo' as AdminLang)}
                        className={styles.Title}>
                        {translate('productdetail.nocombo' as AdminLang)}
                    </Legend>
                )}
            </div>
        </section>
    );
};

export default memo(ProductDetailCollectionSection);
