/* react */
import { Fragment, memo } from 'react';
import { useTranslation } from 'react-i18next';
/* context */
import { useProductDetailContext } from '../ProductDetail.context';
/* components */
import { Button, Legend } from 'shared/components';
import { Badge } from 'admin/core';
/* types */
import { TitleListItemDTO } from 'admin/collections/types';
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
    } = useProductDetailContext();

    const { t, i18n } = useTranslation();

    return (
        <section className={styles.Addon}>
            <div className={styles.Header}>
                <h2 title={t('views.productdetail.addon.header')}>
                    <Legend hasDots>{t('views.productdetail.addon.header')}</Legend>
                </h2>

                <Button className={ButtonStyles.OutlineNone} title={t('views.productdetail.addon.edit')}>
                    <i>
                        <MdEdit />
                    </i>
                </Button>
            </div>

            <div className={styles.Content}>
                {(product?.multipleChoice.length ?? 0) > 0 ? (
                    <>
                        <Legend hasDots title={t('views.productdetail.addon.multiple')} className={styles.Title}>
                            {t('views.productdetail.addon.multiple')}
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
                        title={t('views.productdetail.addon.nomultiple')}
                        className={styles.Title}>
                        {t('views.productdetail.addon.nomultiple')}
                    </Legend>
                )}

                {(product?.singleChoice.length ?? 0) > 0 ? (
                    <>
                        <Legend hasDots title={t('views.productdetail.addon.single')} className={styles.Title}>
                            {t('views.productdetail.addon.single')}
                        </Legend>

                        <div className={styles.TitleCollection}>
                            {addonTitleList
                                .reduce(
                                    (prev, current) =>
                                        product?.singleChoice.find(single => single.titleId === current.titleId) !==
                                        undefined
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
                        title={t('views.productdetail.addon.nosingle')}
                        className={styles.Title}>
                        {t('views.productdetail.addon.nosingle')}
                    </Legend>
                )}
            </div>
        </section>
    );
};

export default memo(ProductDetailAddonSection);
