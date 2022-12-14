/* react */
import { Fragment, memo } from 'react';
/* context */
import { useProductDetailContext } from '../ProductDetail.context';
/* components */
import { Button, Legend } from 'shared/components';
import { AdminLang, Badge, useAdminLang } from 'admin/core';
/* types */
import { ComplementTitleListItemDTO } from 'admin/collections/types';
/* assets */
import { MdEdit } from 'react-icons/md';
/* styles */
import { ButtonStyles } from 'shared/styles';
import styles from './ProductDetailAddon.module.scss';

const ProductDetailAddonSection = () => {
    const {
        /* states */
        product,
        addonTitleList,
        showUpdateAddon,
    } = useProductDetailContext();

    const { translate, lang } = useAdminLang();

    return (
        <section className={styles.Addon}>
            <div className={styles.Header}>
                <h2 title={translate('productdetail.accessory')}>
                    <Legend hasDots>{translate('productdetail.accessory')}</Legend>
                </h2>

                <Button
                    className={ButtonStyles.OutlineNone}
                    onClick={showUpdateAddon}
                    title={translate('actions.edit')}>
                    <i>
                        <MdEdit />
                    </i>
                </Button>
            </div>

            <div className={styles.Content}>
                {(product?.multipleChoice.length ?? 0) > 0 ? (
                    <>
                        <Legend title={translate('productdetail.multiple')} className={styles.Title}>
                            {translate('productdetail.multiple')}
                        </Legend>

                        <div className={styles.TitleCollection}>
                            {addonTitleList
                                .reduce(
                                    (prev, current) =>
                                        product?.multipleChoice.find(
                                            multiple => multiple.titleId === current.titleId
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
                        title={translate('productdetail.nomultiple')}
                        className={styles.Title}>
                        {translate('productdetail.nomultiple')}
                    </Legend>
                )}

                {(product?.singleChoice.length ?? 0) > 0 ? (
                    <>
                        <Legend title={translate('productdetail.single')} className={styles.Title}>
                            {translate('productdetail.single')}
                        </Legend>

                        <div className={styles.TitleCollection}>
                            {addonTitleList
                                .reduce(
                                    (prev, current) =>
                                        product?.singleChoice.find(single => single.titleId === current.titleId) !==
                                        undefined
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
                        title={translate('productdetail.nosingle')}
                        className={styles.Title}>
                        {translate('productdetail.nosingle')}
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
                        title={translate('productdetail.nocombo' as AdminLang)}
                        className={styles.Title}>
                        {translate('productdetail.nocombo' as AdminLang)}
                    </Legend>
                )}
            </div>
        </section>
    );
};

export default memo(ProductDetailAddonSection);
